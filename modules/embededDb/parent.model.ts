import { EntityNames } from '@dilta/shared';
import { baseModel, CollectionConfig } from './shared.model';

/** key to retrieve the collection form the db intialize object */

/**
 * the student's parent biodata schema configuration and properties
 */
export const parentSchema = {
  title: 'Student Parent Schema',
  version: 0,
  description: 'stores student parents biodata information',
  type: 'object',
  properties: {
    phoneNo: {
      type: 'string',
      unique: true,
      final: true
    },
    name: {
      type: 'string'
    },
    relationship: {
      type: 'number'
    },
    homeAddress: {
      type: 'string'
    },
    workAddress: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    profession: {
      type: 'string'
    },
    workcategory: {
      type: 'string'
    },
    town: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    ...baseModel.schema
  },
  required: [
    'phoneNo',
    'name',
    'relationship',
    'homeAddress',
    'town',
    'state',
    ...baseModel.required
  ]
};

export const parentModel: CollectionConfig<typeof parentSchema> = {
  name: EntityNames.Parent,
  schema: parentSchema
};
