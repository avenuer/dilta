import { CollectionConfig, baseModel } from '../shared.model';

import { EntityNames } from '@dilta/shared';

/** key to retrieve the collection form the db intialize object */

/**
 * the student biodata schema configuration and properties
 */
export const studentSchema = {
  title: 'Student Schema',
  version: 0,
  description: 'stores student biodata records',
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    class: {
      type: 'number'
    },
    gender: {
      type: 'string'
    },
    dob: {
      type: 'number'
    },
    bloodgroup: {
      type: 'string'
    },
    admissionNo: {
      type: 'string'
    },
    prevschool: {
      type: 'string'
    },
    parentPhone: {
      type: 'string',
      final: true
    },
    ...baseModel.schema
  },
  required: [
    'name',
    'class',
    'dob',
    'gender',
    'parentPhone',
    ...baseModel.required
  ]
};

export const studentModel: CollectionConfig<typeof studentSchema> = {
  name: EntityNames.Student,
  schema: studentSchema
};
