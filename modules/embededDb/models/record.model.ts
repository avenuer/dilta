import { EntityNames } from '@dilta/shared';
import { baseModel, CollectionConfig } from '../shared.model';

/** key to retrieve the collection form the db intialize object */

/**
 * subject record information and schema
 */
export const recordSchema = {
  title: 'Record Schema',
  version: 0,
  description: 'stores records created by teachers',
  type: 'object',
  properties: {
    subject: {
      type: 'string',
      final: true
    },
    teacherId: {
      ref: 'user',
      type: 'string',
      final: true
    },
    class: {
      type: 'number',
      final: true
    },
    session: {
      type: 'string',
      final: true
    },
    term: {
      type: 'number',
      final: true
    },
    ...baseModel.schema
  },
  required: [
    'subject',
    'teacherId',
    'class',
    'session',
    'term',
    ...baseModel.required
  ]
};

export const recordModel: CollectionConfig<typeof recordSchema> = {
  name: EntityNames.Record,
  schema: recordSchema
};
