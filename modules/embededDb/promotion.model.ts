import { EntityNames } from '@dilta/shared';
import { baseModel, CollectionConfig } from './shared.model';

/** key to retrieve the collection form the db intialize object */

/**
 * student academic promotion information and schema
 */
export const promotionSchema = {
  title: 'Promotion Schema',
  version: 0,
  description: 'stores records created by teachers',
  type: 'object',
  properties: {
    newLevel: {
      type: 'number',
    },
    level: {
      type: 'number',
      final: true
    },
    session: {
      type: 'string',
      final: true
    },
    studentId: {
      type: 'string',
      final: true
    },
    ...baseModel.schema
  },
  required: [
    'newLevel',
    'level',
    'class',
    'session',
    'studentId',
    ...baseModel.required
  ]
};

export const promotionModel: CollectionConfig<typeof promotionSchema> = {
  name: EntityNames.Promotion,
  schema: promotionSchema
};
