import { school } from '@dilta/gen';
import { School } from '@dilta/shared';
import { schoolActions, SchoolActions } from './school.actions';

export interface SchoolStore {
  error?: Error;
  details?: School;
}

const initalState: SchoolStore = {
  // TODO: Remove hack below
  details: {
    id: 'my_random_school_id'
   } as any
};

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
