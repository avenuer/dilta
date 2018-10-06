
import { EmbeddedRxDBError, noIdError } from './errors';
import { RxCollection, RxError } from 'rxdb';
import { throwError } from 'rxjs';
import { to } from 'await-to-js';
import { BaseModel, FindQueryParam } from '@dilta/shared';
import { DBModel } from './db-abstract';
import { defaultPreSave, defaultPreInsert, CollectionMaps, Embededb, } from '@dilta/emdb';
import { autobind } from 'core-decorators';

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
    // important due rxdb lifecycle hooks
    item = defaultPreSave(item);
    const [err, newItem] = await to(
      this.collection.upsert(item).then(res => res.toJSON())
    );
    this.cleanError(err);
    return newItem;
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
    let err: RxError;
    item = defaultPreInsert((item as any) as T);
    [err, item] = await to(
      this.collection.upsert(item).then(res => res.toJSON())
    );
    this.cleanError(err);
    return (item as any) as T;
  }

  /**
   * delete item that match the query
   *
   * @param {Partial<T>} query
   * @returns
   * @memberof ModelBase
   */
  async delete$(query: Partial<T>) {
    const [err, success] = await to(
      this.collection
        .findOne(query)
        .exec()
        .then(e => e.remove())
    );
    this.cleanError(err);
    return success;
  }

  /**
   * cleans and throwError
   *
   * @param {RxError} err
   * @memberof ModelBase
   */
  cleanError(err: RxError) {
    if (err) {
      throwError(err.rxdb ? new EmbeddedRxDBError(err) : err);
    }
  }
}
