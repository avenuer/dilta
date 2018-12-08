import { DBModel } from './db-abstract';
import { EmbeddedRxDBError, noIdError } from './errors';
import {
  CollectionMaps,
  defaultPreInsert,
  defaultPreSave,
  Embededb
  } from '@dilta/emdb';
import {
  BaseModel,
  EntityNames,
  FindQueryParam,
  FindResponse,
  SearchFindRequest
  } from '@dilta/shared';
import { autobind } from 'core-decorators';
import { RxCollection } from 'rxdb';

/** Query Constants for find query */
enum QUERY_CONSTANTS {
  skip = 0,
  limit = 10,
  sort = 'id'
}

/**
 * base class for all model must adhere to has an interface for interaction
 *
 * @export
 * @class ModelBase
 * @implements {Model<T>}
 * @tem0p0late T
 */
@autobind()
export class ModelBase<T extends Partial<BaseModel>> implements DBModel<T> {
  public collection: RxCollection<T>;

  constructor(
    public collectionName: EntityNames,
    public database: Promise<Embededb>
  ) {
    this.database.then(db => {
      this.collection = db[this.collectionName] as any;
    });
  }

  /**
   * to retrieve a single item
   *
   * @param {Partial<T>} query search params
   * @returns
   * @memberof ModelBase
   */
  async retrieve$(query: Partial<T>) {
    const res = await this.collection.findOne(query).exec();
    return res ? res.toJSON() : res;
  }

  /**
   * searchs for any items that matches the query defined
   *
   * @param {Partial<T>} query
   * @param {(FindQueryParam | boolean)} [custom] disable default custom params
   * @returns
   * @memberof ModelBase
   */
  find$(query: SearchFindRequest<T>, custom?: FindQueryParam) {
    let { limit, skip, sort } = QUERY_CONSTANTS as any;

    if (custom) {
      limit = custom.limit || limit;
      skip = custom.skip || skip;
      sort = custom.sort || sort;
    }
    const queryParams: FindQueryParam = { limit, skip, sort };
    if (typeof query === 'string') {
      return this.search(query, queryParams);
    }
    return this.find(query, queryParams);
  }

  /**
   * executes the search query
   *
   * @param {string} query
   * @param {FindQueryParam} { skip, limit }
   * @returns {FindResponse<T>}
   * @memberof ModelBase
   */
  async search(
    query: string,
    { skip, limit }: FindQueryParam
  ): Promise<FindResponse<T>> {
    const regx = new RegExp(`${query}`, 'i');
    const allDocs = await this.collection
      .find({})
      .exec()
      .then(res => res.map(e => e.toJSON()));
    const matchDocs = allDocs.filter(e => regx.test(JSON.stringify(e)));
    return {
      skip,
      limit,
      data: matchDocs.slice(skip, limit + skip),
      total: matchDocs.length
    };
  }

  /**
   * executes the find query
   *
   * @param {Partial<T>} query
   * @param {FindQueryParam} { skip, limit }
   * @returns {FindResponse<T>}
   * @memberof ModelBase
   */
  async find(
    query: Partial<T>,
    { skip, limit }: FindQueryParam
  ): Promise<FindResponse<T>> {
    const matchDocs = await this.collection
      .find(query)
      .exec()
      .then(res => res.map(e => e.toJSON()));
    return {
      skip,
      limit,
      data: matchDocs.slice(skip, limit + skip),
      total: matchDocs.length
    };
  }

  /**
   * creates a new one
   *
   * @param {Partial<T>} item
   * @returns
   * @memberof ModelBase
   */
  async update$(id: string, item: Partial<T>) {
    if (!id) {
      throw noIdError;
    }
    try {
      item = defaultPreSave(item);
      const newItem = await this.collection
        .upsert(item)
        .then(res => res.toJSON());
      return newItem;
    } catch (error) {
      throw new EmbeddedRxDBError(error);
    }
  }

  /**
   * creates a new item that matches
   *
   * @param {Partial<T>} item
   * @returns
   * @memberof ModelBase
   */
  async create$(item: Partial<T>) {
    // important due rxdb lifecycle hooks
    try {
      item = defaultPreInsert((item as any) as T);
      item = await this.collection.upsert(item).then(res => res.toJSON());
      return (item as any) as T;
    } catch (error) {
      throw new EmbeddedRxDBError(error);
    }
  }

  /**
   * delete item that match the query
   *
   * @param {Partial<T>} query
   * @returns
   * @memberof ModelBase
   */
  async delete$(query: Partial<T>) {
    try {
      const success = await this.collection
        .findOne(query)
        .exec()
        .then(e => e.remove());
      return success;
    } catch (error) {
      throw new EmbeddedRxDBError(error);
    }
  }
}
