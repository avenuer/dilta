import { baseModel, CollectionConfig } from './shared.model';
import { EntityNames } from '@dilta/shared';

/** key to retrieve the collection form the db intialize object */

/**
 * subject record information and schema
 */
export const subjectSchema = {
  title: 'Subject Schema',
  version: 0,
  description: 'stores student subject records and scores',
  type: 'object',
  properties: {
    teacherId: {
      ref: 'user',
      type: 'string',
      final: true
    },
    firstCa: {
      type: 'number',
      min: 0,
      max: 15,
      default: 0
    },
    secondCa: {
      type: 'number',
      min: 0,
      max: 15,
      default: 0
    },
    exam: {
      type: 'number',
      min: 0,
      max: 70,
      default: 0
    },
    total: {
      type: 'number',
      min: 0,
      max: 100,
      default: 0
    },
    studentId: {
      ref: 'student',
      type: 'string',
      final: true
    },
    recordId: {
      ref: 'record',
      type: 'string',
      final: true
    },
    ...baseModel.schema
  },
  required: [
    'teacherId',
    'studentId',
    'recordId',
    ...baseModel.required
  ]
};

export const subjectModel: CollectionConfig<typeof subjectSchema> = {
  name: EntityNames.Subject,
  schema: subjectSchema
};
