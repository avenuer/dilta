import { baseModel, CollectionConfig } from './shared.model';
import { EntityNames } from '@dilta/shared';
/** key to retrieve the collection form the db intialize object */
const SCHOOL_NAME = 'school';

const { school, ...others } = baseModel.schema;

/**
 * the student biodata schema configuration and properties
 */
export const schoolSchema = {
  title: 'School BioData Schema',
  version: 0,
  description: 'stores the school biodata information',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      unique: true,
      final: true
    },
    email: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    category: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    town: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    logo: {
      type: 'string'
    },
    globalId: {
      type: 'string',
      final: true,
      unique: true
    },
    ...others
  },
  required: [
    'name',
    'description',
    'address',
    'category',
    'town',
    'state',
    ...baseModel.required.filter(k => k !== 'school')
  ]
};

export const schoolModel: CollectionConfig<typeof schoolSchema> = {
  name: EntityNames.School,
  schema: schoolSchema
};
