import { Injectable } from '@angular/core';
import {
  API_STATUS_CODE,
  API_STATUS_RESPONSE,
  ApiFormat,
  ApiResponse,
  BaseResponse,
  EntityNames,
  Log,
  modelActionFormat,
  ModelOperations,
  Transport
  } from '@dilta/shared';
import { ElectronService } from 'ngx-electron';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as uuid from 'uuid/v4';

// const REQUEST_TIME_OUT = 2000;
const REQUEST_TIME_OUT = 200000;

/**
 * Response Error Interface for the application
 *
 * @interface ResponseError
 * @extends {BaseResponse}
 */
interface ResponseError extends BaseResponse {
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  constructor(private electron: ElectronService) {}

  /**
   *  Execute a model Action with the argument parameters
   *
   * @template ResponseData
   * @param {EntityNames} model
   * @param {ModelOperations} operation
   * @param {...any[]} args
   * @returns {Observable<ResponseData>}
   * @memberof TransportService
   */
  modelAction<ResponseData>(
    model: EntityNames,
    operation: ModelOperations,
    ...args: any[]
  ): Observable<ResponseData> {
    return this.execute.apply(this, [
      modelActionFormat(model, operation),
      ...args
    ]);
  }

  /**
   * maps the action to request context sent and returns the
   * Observble of responseType throwing error if error exist
   *
   * @template ResponseData
   * @param {string} action
   * @param {...any[]} args
   * @returns
   * @memberof TransportService
   */
  execute<ResponseData>(action: string, ...args: any[]) {
    const id: string = uuid();
    return from(this.bus<ResponseData>({ action, data: args, id })).pipe(
      map(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        return res.data;
      })
    );
  }

  /**
   * sends the JSON query to the main process event
   *
   * @template ResponseType
   * @param {ApiFormat} ctx
   * @returns {Promise<ApiResponse<ResponseType>>}
   * @memberof TransportService
   */
  bus<ResponseType>(ctx: ApiFormat): Promise<ApiResponse<ResponseType>> {
    this.electron.ipcRenderer.send(Transport.Request, ctx);
    console.log(ctx);
    return new Promise((resolve, rejects) => {
      this.electron.ipcRenderer.on(
        Transport.Response,
        (event: Event, response: ApiResponse<ResponseType>) => {
          if (response.reqId === ctx.id) {
            console.log(response);
            return resolve(response);
          }
        }
      );
      setTimeout(() => rejects(this.timeoutError(ctx)), REQUEST_TIME_OUT - 200);
    });
  }

  /**
   * Custom error mapped for request if allowed extecution time eluded.
   *
   * @template T
   * @param {ApiFormat} ctx
   * @returns {ResponseError}
   * @memberof TransportService
   */
  timeoutError<T>(ctx: ApiFormat): ResponseError {
    return {
      reqId: ctx.id,
      status: API_STATUS_RESPONSE.Failure,
      time: Date.now(),
      error: `Api Response Time Out Eludeded`,
      code: API_STATUS_CODE.Failure
    };
  }


  /**
   * sends the logs across the transport and displays in render console also.
   *
   * @param {logMethod} method
   * @param {Log} log
   * @param {...any[]} others
   * @memberof TransportService
   */
  log(method: logMethod, log: Log, ...others: any[]) {

  }
}

export type logMethod = 'debug' | 'info' | 'error' | 'warn' | 'trace';
