import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ClientAuthService } from '../services/auth.service';
import * as AuthActions from './auth.action';

const { AuthActionTypes, Status } = AuthActions;

@Injectable()
export class AuthEffects {
  /**
   * side-effect triggered when a user attempts to login ino the program
   *
   * @memberof AuthEffects
   */
  @Effect()
  login$ = this.actions$
    .ofType<AuthActions.AuthLogin>(AuthActionTypes.Login)
    .pipe(
      // changing action to payload only
      map(action => action.payload),
      // querying for various actions to login
      exhaustMap(payload => {
        return this.auth.login(payload).pipe(
          // alerting the store of the successfull operation
          map(bio => {
            const success = {
              status: Status.Success,
              timeStamp: Date.now(),
              ...bio,
            };
            return new AuthActions.AuthLoginSuccess(success);
          }),
          // notify the store of any error
          catchError(err => of(new AuthActions.AuthLoginFailure(err)))
        );
      })
    );

    @Effect()
    signUp$ = this.actions$
      .ofType<AuthActions.AuthSignUp>(AuthActionTypes.SignUp)
      .pipe(
        map(action => action.payload),
        exhaustMap(payload => {
          return this.auth.signup(payload)
            .pipe(map((bio) => {
                const success = {
                  status: Status.Success,
                  timeStamp: Date.now(),
                  ...bio,
                };
                return new AuthActions.AuthLoginSuccess(success);
              }),
              // notify the store of any error
              catchError(err => of(new AuthActions.AuthSignUpFailure(err)))
            );
        })
      );


  constructor(
    public actions$: Actions,
    private auth: ClientAuthService,
  ) {}
}
