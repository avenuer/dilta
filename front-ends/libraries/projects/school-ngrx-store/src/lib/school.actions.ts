import { School } from '@dilta/shared';
import { Action } from '@ngrx/store';

export interface ActionUpdate<T> {
  id: string;
  update: T;
}

export enum SchoolActions {
  CreateSchool = '[SCHOOL] [Create]',
  RetrieveSchool = '[SCHOOL] [Retrieve]',
  UpdateSchool = '[SCHOOL] [Update]',
  DeleteSchool = '[SCHOOL] [Delete]',
  SuccessSchoolAction = '[SCHOOL] [Success]',
  FailureSchoolAction = '[SCHOOL] [Failure]'
}

/** action to create new school */
export class CreateSchoolAction implements Action {
  readonly type = SchoolActions.CreateSchool;
  constructor(public payload: Partial<School>) {}
}

/** action dispatched to get school details */
export class RetrieveSchoolAction implements Action {
  readonly type = SchoolActions.RetrieveSchool;
  constructor(public payload?: string) {}
}

/** action dispatched to update school details */
export class UpdateSchoolAction implements Action {
  readonly type = SchoolActions.UpdateSchool;
  constructor(public payload: ActionUpdate<School>) {}
}

/** action dispatched to delete school details */
export class DeleteSchoolAction implements Action {
  readonly type = SchoolActions.DeleteSchool;
  constructor(public payload: string) {}
}

/** action dispatched to update school details */
export class SchoolActionFailure implements Action {
  readonly type = SchoolActions.FailureSchoolAction;
  constructor(public payload: Error) {}
}
/** action dispatched to update school details */
export class SchoolActionSuccess implements Action {
  readonly type = SchoolActions.SuccessSchoolAction;
  constructor(public payload: School) {}
}

export type schoolActions =
  | CreateSchoolAction
  | RetrieveSchoolAction
  | UpdateSchoolAction
  | DeleteSchoolAction
  | SchoolActionFailure
  | SchoolActionSuccess;
