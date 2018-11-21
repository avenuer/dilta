import { EntityNames } from '@dilta/shared';
import { baseModel, CollectionConfig } from './shared.model';

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
      type: 'string',
      final: true
    },
    session: {
      type: 'string',
      final: true
    },
    term: {
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
    studentId: {
      ref: 'student',
      type: 'string',
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
    'studentId',
    ...baseModel.required
  ]
};

export const subjectModel: CollectionConfig<typeof subjectSchema> = {
  name: EntityNames.Subject,
  schema: subjectSchema
};
