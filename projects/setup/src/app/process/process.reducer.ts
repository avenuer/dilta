import { SchoolEncryptedData } from '@dilta/shared';
import { createFeatureSelector } from '@ngrx/store';
import { ProcessActions, ProcessAction } from './process.actions';

/** Process Feature Name */
export const ProcessFeatureName = 'process';
/** feature selector for selecting process state section fro the store */
export const processFeature = createFeatureSelector<ProcessState>(
  ProcessFeatureName
);

export interface ProcessState {
  schoolData: SchoolEncryptedData;
  error: Error;
}

export const coreInitialState: ProcessState = {
  schoolData: null,
  error: undefined
};

export function ProcessActionReducer(
  state = coreInitialState,
  action: ProcessActions
): ProcessState {
  switch (action.type) {
    case ProcessAction.LIENSCE_KEY_SUCCESS: {
      return {
        ...state,
        schoolData: action.payload,
        error: undefined
      };
    }
    case ProcessAction.LIENSCE_KEY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
