import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TransportService } from '@dilta/electron-client';
import {
  ProcessAction,
  RetrieveLiensceKey,
  DelLiensceKey,
  LiensceKey,
  LiensceKeyError,
  UpdateLiensceKey,
  LiensceKeySuccess,
  ResetLiensceKey
} from './process.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { SchoolEncryptedData, LIENSCE_KEY } from '@dilta/shared';
import { of, Observable } from 'rxjs';

/**
 *  User Settings Effects.
 *
 * @class SettingsEffects
 */
@Injectable()
export class ProcessEffects {
  constructor(
    private action: Actions,
    private transport: TransportService
  ) {}

  /**
   * dispatches the action to decrypt the liensce key
   *
   * @memberof ProcessEffects
   */
  @Effect()
  verify$ = this.action
    .ofType<LiensceKey>(ProcessAction.VERITY_LIENSCE_KEY)
    .pipe(
      exhaustMap(action =>
        this.streamMap(
          this.transport.execute<SchoolEncryptedData>(LIENSCE_KEY.Decrypt, action.payload)
        )
      )
    );

  /**
   * dispatches the action to get the liensce key from the process
   *
   * @memberof ProcessEffects
   */
  @Effect()
  retrieve$ = this.action
    .ofType<RetrieveLiensceKey>(ProcessAction.RETRIEVE_LIENSCE_KEY)
    .pipe(
      exhaustMap(action =>
        this.streamMap(this.transport.execute<SchoolEncryptedData>(LIENSCE_KEY.Retrieve))
      )
    );

  /**
   * saves the liensce key to the process
   *
   * @memberof ProcessEffects
   */
  @Effect()
  update$ = this.action
    .ofType<UpdateLiensceKey>(ProcessAction.UPDATE_LIENSCE_KEY)
    .pipe(
      exhaustMap(action =>
        this.streamMap(this.transport.execute(LIENSCE_KEY.Update, action.payload))
      )
    );

  @Effect()
  delete$ = this.action
    .ofType<DelLiensceKey>(ProcessAction.DELETE_LIENSCE_KEY)
    .pipe(
      exhaustMap(action =>
        this.transport
          .execute<boolean>(LIENSCE_KEY.Delete)
          .pipe(
            map(
              status =>
                status
                  ? new ResetLiensceKey()
                  : new LiensceKeyError(failedLiensceResetError)
            )
          )
      )
    );

  /**
   * maps the observable to error and success
   *
   * @template T
   * @param {Observable<T>} stream
   * @returns
   * @memberof ProcessEffects
   */
  streamMap(stream: Observable<SchoolEncryptedData>) {
    return stream.pipe(
      map(data => new LiensceKeySuccess(data)),
      catchError(err => of(new LiensceKeyError(err)))
    );
  }
}

// error thrown for failed liensce delete
export const failedLiensceResetError = new Error('Failed to reset the liense from the process');
