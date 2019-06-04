import { schoolActions, SchoolActions } from './school.actions';
import { School } from '@dilta/shared';

export interface SchoolStore {
  error?: Error;
  details?: School;
}

const initalState: SchoolStore = {};

export function schoolReducer(state = initalState, action: schoolActions) {

  switch (action.type) {
    case SchoolActions.FailureSchoolAction: {
      return { error: action.payload, details: null };
    }
    case SchoolActions.SuccessSchoolAction: {
      return { error: null, details: action.payload };
    }
    case SchoolActions.DeleteSchool: {
      return initalState;
    }
    default:
      return state;
  }

}
