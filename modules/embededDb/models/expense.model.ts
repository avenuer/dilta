import { EntityNames } from '@dilta/shared';

import { baseModel, CollectionConfig } from '../shared.model';

/** key to retrieve the collection form the db intialize object */

/**
 * the student's payment receipt schema configuration and properties
 */
export const ExpenseSchema = {
  title: 'School expense Schema',
  version: 0,
  description: 'stores users expense schema',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      unique: true,
      final: true
    },
    date: {
      type: 'string',
      final: true
    },
    amount: {
      type: 'number',
      final: true
    },
    receiverId: {
      type: 'string'
    },
    busarId: {
      type: 'string',
      final: true
    },
    purpose: {
      type: 'string'
    },
    category: {
      type: 'string'
    },
    session: {
      type: 'string',
      final: true
    },
    term: {
      type: 'number',
      final: true
    },
    createdAt: {
      type: 'string',
      final: true
    },
    updatedAt: {
      type: 'string'
    },
    capital: {
      type: 'boolean'
    },
    ...baseModel.schema
  },
  required: [
    'busarId',
    'name',
    'amount',
    'session',
    'term',
    ...baseModel.required
  ]
};

export const ExpenseModel: CollectionConfig<typeof ExpenseSchema> = {
  name: EntityNames.Expense,
  schema: ExpenseSchema
};
