import { CollectionConfig } from './shared.model';
import { EntityNames } from '@dilta/shared';
import { baseModel } from './shared.model';
/** key to retrieve the collection form the db intialize object */

export const academicSettingSchema = {
  title: 'School Academic Configuration',
  version: 0,
  description: 'stores schools academic configuration',
  type: 'object',
  additionalProperties: true,
    properties: {
      grade: {
        type: 'object',
        additionalProperties: true,
        properties: {
          A: {
            type: 'object',
            additionalProperties: true,
            properties: {
              max: {
                type: 'number'
              },
              min: {
                type: 'number'
              }
            }
          },
          B: {
            type: 'object',
            additionalProperties: true,
            properties: {
              max: {
                type: 'number'
              },
              min: {
                type: 'number'
              }
            }
          },
          C: {
            type: 'object',
            additionalProperties: true,
            properties: {
              max: {
                type: 'number'
              },
              min: {
                type: 'number'
              }
            }
          },
          D: {
            type: 'object',
            additionalProperties: true,
            properties: {
              max: {
                type: 'number'
              },
              min: {
                type: 'number'
              }
            }
          },
          E: {
            type: 'object',
            additionalProperties: true,
            properties: {
              max: {
                type: 'number'
              },
              min: {
                type: 'number'
              }
            }
          },
          F: {
            type: 'object',
            additionalProperties: true,
            properties: {
              max: {
                type: 'number'
              },
              min: {
                type: 'number'
              }
            }
          }
        }
      },
      record: {
        type: 'object',
        additionalProperties: true,
        properties: {
          exam: {
            type: 'object',
            additionalProperties: true,
            properties: {
              max: {
                type: 'number'
              },
              title: {
                type: 'string'
              }
            }
          },
          firstCa: {
            type: 'object',
            additionalProperties: true,
            properties: {
              max: {
                type: 'number'
              },
              title: {
                type: 'string'
              }
            }
          },
          secondCa: {
            type: 'object',
            additionalProperties: true,
            properties: {
              max: {
                type: 'number'
              },
              title: {
                type: 'string'
              }
            }
          }
        }
    },
    ...baseModel.schema
  },
  required: [...baseModel.required]
};

export const academicSettingsModel: CollectionConfig<
  typeof academicSettingSchema
> = {
  name: EntityNames.academic_setting,
  schema: academicSettingSchema
};
