import { Auth } from '@dilta/shared';
import { AuthActions, AuthActionTypes, Status } from './auth.action';
import { AuthTokenUser } from '../services/auth.service';

/**
 * Interface for a successfull Authentication
 *
 * @interface Authsuccess
 */
export interface Authsuccess extends Partial<AuthTokenUser> {
  /**
   * current authentication status
   *
   * @type {string}
   * @memberof Authsuccess
   */
  status: string;
  /**
   * timestamp for the successful authentication of the
   * login User
   *
   * @type {(Date | string)}
   * @memberof Authsuccess
   */
  timeStamp: Date | string | number;

  /**
   * Any Error thrown for the Auth
   *
   * @type {Error}
   * @memberof Authsuccess
   */
  error?: Error;
}

export const authInitialState: Authsuccess = {
  status: Status.Pending,
  timeStamp: Date(),
  error: null
};

/**
 * reducer responsible for the authentication of the system
 *
 * @export
 * @param {any} [state=authInitialState]
 * @param {AuthActions} action
 * @returns {Authsuccess}
 */
export function authReducer(
  state = authInitialState,
  action: AuthActions
): Authsuccess {
  switch (action.type) {
    // when the login is succesfull
    case AuthActionTypes.Success: {
      return {
        // return new class state
        ...state,
        ...action.payload,
        error: null,
        status: Status.Success,
        timeStamp: Date.now()
      };
    }
    case AuthActionTypes.LoginFailure:
    case AuthActionTypes.SignUpFailure: {
      return {
        ...state,
        error: action.payload,
        status: Status.Failure,
        timeStamp: Date.now()
      };
    }
    // when the login auth is loged - out
    case AuthActionTypes.LogOut: {
      return {
        ...authInitialState,
        status: Status.Success
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * interface for notifying the store of a succesful update
 *
 * @export
 * @interface AuthUpdateStatusPayload
 */
export interface AuthUpdateStatusPayload {
  /**
   * status of the operation
   *
   * @type {string}
   * @memberof AuthUpdateStatusPayload
   */
  status: string;
  /**
   * id of the auth user to updated
   *
   * @type {string}
   * @memberof AuthUpdateStatusPayload
   */
  id: string;
  /**
   * the updated auth detail
   *
   * @type {Auth}
   * @memberof AuthUpdateStatusPayload
   */
  update: Auth;
}
