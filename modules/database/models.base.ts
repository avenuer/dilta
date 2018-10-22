import { DBModel } from './db-abstract';
import { EmbeddedRxDBError, noIdError } from './errors';
import {
  CollectionMaps,
  defaultPreInsert,
  defaultPreSave,
  Embededb
  } from '@dilta/emdb';
import { BaseModel, FindQueryParam } from '@dilta/shared';
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
    public collectionName: keyof CollectionMaps,
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
  find$(query: Partial<T>, custom?: FindQueryParam | boolean) {
    let q = this.collection.find(query);
    if (typeof custom !== 'boolean') {
      const { limit, skip, sort } = custom || ({} as any);
      q = q
        .sort(sort || QUERY_CONSTANTS.sort)
        .skip(skip || QUERY_CONSTANTS.skip)
        .limit(limit || QUERY_CONSTANTS.limit);
    }
    return q.exec().then(res => res.map(e => e.toJSON()));
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
