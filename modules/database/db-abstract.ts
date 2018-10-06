
/**
 * Generic model operations reguarding database operations
 *
 * @export
 * @abstract
 * @class Model
 * @template T class or interface of the model
 */
export abstract class DBModel<T> {
  constructor() {}
  /**
   * method called to get a model from the database
   *
   * @abstract
   * @param {Partial<T>} id unique identifer to retrieve
   * @memberof Model
   */
  abstract retrieve$(query: Partial<T>): Promise<T>;
  /**
   * method called to query the model from database
   *
   * @abstract
   * @param {Partial<T>} query query object info
   * @memberof Model
   */
  abstract find$(query: Partial<T>): Promise<T[]>;


  /**
   * methods to create an new item
   *
   * @abstract
   * @param {Partial<T>} item
   * @returns {Promise<T>}
   * @memberof DBModel
   */
  abstract create$(item: Partial<T>): Promise<T>;

  /**
   * method to update the item in the database
   *
   * @abstract
   * @param {Partial<T>} item item to be updated to
   * @memberof Model
   */
  abstract update$(id: string, item: Partial<T>): Promise<T>;
  /**
   * method called to delete the item in the database
   *
   * @abstract
   * @param {item} T unique identifer to delete
   * @memberof Model
   */
  abstract delete$(item: Partial<T>): Promise<boolean>;
}
