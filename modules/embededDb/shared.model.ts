import * as uuidRandom from 'uuid/v4';
import { BaseModel } from '@dilta/shared';

export const baseModel = {
  schema: {
    id: {
      type: 'string',
      primary: true
    },
    hash: {
      type: 'string'
    },
    createdAt: {
      type: 'number'
    },
    updatedAt: {
      type: 'number'
    },
    school: {
      ref: 'school',
      type: 'string',
      final: true
    }
  },
  required: ['hash', 'createdAt', 'updatedAt', 'school']
};

/**
 * to set base required parameters for the aplication
 *
 * @export
 * @template T
 * @param {*} doc
 * @returns {T}
 */
export function updateBaseModel<T extends BaseModel>(doc: any): T {
  return {
    ...doc,
    ...generateBase(doc)
  };
}

/**
 * to generate base required parameters
 *
 * @template T
 * @param {T} doc
 * @returns {BaseModel}
 */
function generateBase<T extends BaseModel>(doc: T): BaseModel {
  const date = Date.now();
  return {
    id: doc.id ? doc.id : uuidRandom(),
    createdAt: !doc.createdAt ? date : doc.createdAt,
    hash: doc.hash ? doc.hash : `${date.toString()}::${uuidRandom()}`,
    updatedAt: date,
    school: doc.school
  };
}

/**
 * the configuration interface for creating collections on the database
 *
 * @export
 * @interface CollectionConfig
 */

export interface CollectionConfig<T> {
  /**
   * the name of the collection is key
   *
   * @type {string}
   * @memberof CollectionConfig
   */
  name: string;
  /**
   * the optional collection name in the database
   * defaulted to name if ommitted
   *
   * @type {string}
   * @memberof CollectionConfig
   */
  collection?: string;
  /**
   * the schema of the collection to be created
   *
   * @type {RxSchema}
   * @memberof CollectionConfig
   */
  schema: T;

  /**
   * options provided has configurations
   *
   * @type {object}
   * @memberof CollectionConfig
   */
  options?: object;
}


/**
 * function called for setting default schema requirements before saving
 *
 * @export
 * @template T
 * @param {*} doc
 * @returns {T}
 */
export function defaultPreInsert<T extends Partial<BaseModel>>(doc: T): T {
  return { ...doc as any, ...generateBase(doc as any)};
}


/**
 * function called for updating default schema requirement after saving
 *
 * @export
 * @template T
 * @param {*} doc
 * @returns {T}
 */
export function defaultPreSave<T extends Partial<BaseModel>>(doc: T): T {
  return { ...doc as any, updatedAt: Date.now() };
}

/** default middlewareoptinons */
export const defaultModelMiddleWare = {
  preInsert: defaultPreInsert,
  preSave: defaultPreSave
};
