import { CollectionConfig } from './shared.model';
import { EntityNames } from '@dilta/shared';
import { baseModel } from './shared.model';
/** key to retrieve the collection form the db intialize object */

/**
 * stores schools and user settings configuration and properties
 */
export const settingSchema = {
  title: 'School and Users configuration store',
  version: 0,
  description: 'stores schools and user settings configuration and properties',
  type: 'object',
  properties: {
    owner: {
      type: 'string',
      final: true
    },
    type: {
      type: 'string'
    },
    settings: {
      type: 'object',
      properties: {},
      additionalProperties: true
    },
    defaultView: {
      type: 'string'
    },
    ...baseModel.schema
  },
  required: ['owner', 'type', 'defaultView', 'settings', ...baseModel.required],
  additionalProperties: true
};

export const SettingModel: CollectionConfig<typeof settingSchema> = {
  name: EntityNames.Setting,
  schema: settingSchema
};
