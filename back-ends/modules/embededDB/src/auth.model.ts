import { baseModel, CollectionConfig } from './shared.model';
import { EntityNames } from '@dilta/shared';

/** key to retrieve the collection form the db intialize object */

/**
 * the student biodata schema configuration and properties
 */
export const authSchema = {
  title: 'User Authorization Schema',
  version: 0,
  description: 'stores users authorization info and level',
  type: 'object',
  properties: {
    username: {
      type: 'string',
      final: true
    },
    password: {
      type: 'string'
    },
    level: {
      type: 'string'
    },
    ...baseModel.schema
  },
  required: ['username', 'password', 'level', ...baseModel.required]
};

export const authModel: CollectionConfig<typeof authSchema> = {
  name: EntityNames.Auth,
  schema: authSchema
};
