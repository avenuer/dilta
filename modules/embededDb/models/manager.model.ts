import { EntityNames } from '@dilta/shared';
import { baseModel, CollectionConfig } from '../shared.model';

/** key to retrieve the collection form the db intialize object */

/**
 * the school managers biodata schema configuration and properties
 */
export const managerSchema = {
  title: 'School Management contact and information Schema',
  version: 0,
  description: `
    stores the school managerial information like pricncipal
    and properiotes name and contact`,
  type: 'object',
  properties: {
    propName: {
      type: 'string'
    },
    propPhone: {
      type: 'string'
    },
    propEmail: {
      type: 'string'
    },
    sMName: {
      type: 'string'
    },
    sMPhone: {
      type: 'string'
    },
    sMEmail: {
      type: 'string'
    },
    motto: {
      type: 'string'
    },
    ...baseModel.schema
  },
  required: [
    'propName',
    'propPhone',
    'sMName',
    'sMPhone',
    'motto',
    ...baseModel.required
  ]
};

export const managerModel: CollectionConfig<typeof managerSchema> = {
  name: EntityNames.Manager,
  schema: managerSchema
};
