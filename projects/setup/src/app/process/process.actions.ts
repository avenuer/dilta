import { SchoolEncryptedData } from '@dilta/shared';
import { Action } from '@ngrx/store';

/**
 * ngrx actions for getting the   ProcessAction liensce key and school id
 *
 * @export
 * @enum {number}
 */
export enum ProcessAction {
  UPDATE_LIENSCE_KEY = '[PROCESS]  [LIENSCE]  [UPDATE]',
  DELETE_LIENSCE_KEY = '[PROCESS]  [LIENSCE]  [DELETE]',
  RETRIEVE_LIENSCE_KEY = '[PROCESS]  [LIENSCE]  [RETRIEVE]',
  VERITY_LIENSCE_KEY = '[PROCESS]  [LIENSCE]  [VERITY]',
  LIENSCE_KEY_SUCCESS = '[PROCESS]  [LIENSCE]  [VERIFIED]  [SUCCESS]',
  LIENSCE_KEY_ERROR = '[PROCESS]  [LIENSCE]  [VERIFIED]  [ERROR]',
  LIENSCE_KEY_RESET = '[PROCESS]  [LIENSCE]  [VERIFIED]  [RESET]'
}

/**
 * action to emit an event to delete the liensce key
 *
 * @export
 * @class DelApiKey
 * @implements {Action}
 */
export class DelLiensceKey implements Action {
  readonly type = ProcessAction.DELETE_LIENSCE_KEY;
}

/**
 * action to emit an event to reset the liensce key
 *
 * @export
 * @class DelApiKey
 * @implements {Action}
 */
export class ResetLiensceKey implements Action {
  readonly type = ProcessAction.LIENSCE_KEY_RESET;
}

/**
 * action to emit an event to update the liensce key
 *
 * @export
 * @class DelApiKey
 * @implements {Action}
 */
export class UpdateLiensceKey implements Action {
  readonly type = ProcessAction.UPDATE_LIENSCE_KEY;
  constructor(public payload: string) {}
}

/**
 * action to retrieve the liensce key from the local store
 *
 * @export
 * @class RetrieveApiKey
 * @implements {Action}
 */
export class RetrieveLiensceKey implements Action {
  readonly type = ProcessAction.RETRIEVE_LIENSCE_KEY;
}
/**
 * Action dispatched to verify liensce key
 *
 * @export
 * @class VerifyLiensceKey
 * @implements {Action}
 */
export class LiensceKey implements Action {
  readonly type = ProcessAction.VERITY_LIENSCE_KEY;
  constructor(public payload: string) {}
}
/**
 * Action dispatched to notify the store of success of liensce verification
 *
 * @export
 * @class VerifiedLiensceKeySuccess
 * @implements {Action}
 */
export class LiensceKeySuccess implements Action {
  readonly type = ProcessAction.LIENSCE_KEY_SUCCESS;
  constructor(public payload: SchoolEncryptedData) {}
}

/**
 * Action dispatched to notify the store of failure of liensce verification
 *
 * @export
 * @class ApiKeyError
 * @implements {Action}
 */
export class LiensceKeyError implements Action {
  readonly type = ProcessAction.LIENSCE_KEY_ERROR;
  constructor(public payload: Error) {}
}

export type ProcessActions =
  | DelLiensceKey
  | UpdateLiensceKey
  | RetrieveLiensceKey
  | LiensceKey
  | LiensceKeySuccess
  | LiensceKeyError;
