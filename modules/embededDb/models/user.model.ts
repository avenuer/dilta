import { EntityNames } from '@dilta/shared';
import { baseModel, CollectionConfig } from '../shared.model';

/** key to retrieve the collection form the db intialize object */

/**
 * subject record information and schema
 */
export const userSchema = {
  title: 'Admin Schema',
  version: 0,
  description: 'stores various users biodata',
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    gender: {
      type: 'string'
    },
    phoneNo: {
      type: 'string'
    },
    class: {
      type: 'number',
      default: 0
    },
    subject: {
      type: 'string',
      default: 'none'
    },
    phoneNos: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    authId: {
      type: 'string',
      final: true
    },
    ...baseModel.schema
  },
  required: [
    'name',
    'gender',
    'phoneNo',
    'address',
    'image',
    'authId',
    ...baseModel.required
  ]
};

export const userModel: CollectionConfig<typeof userSchema> = {
  name: EntityNames.User,
  schema: userSchema
};
