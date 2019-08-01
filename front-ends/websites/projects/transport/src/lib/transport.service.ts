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
  } from '@dilta/shared';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 } from 'uuid';

// const REQUEST_TIME_OUT = 2000;
const REQUEST_TIME_OUT = 200000;

/**
 * Response Error Interface for the application
 *
 */
interface ResponseError extends BaseResponse {
  error: string;
}

export abstract class AbstractTransportService {
  constructor() {}

  /**
   *  Execute a model Action with the argument parameters
   *
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
   */
  execute<ResponseData>(action: string, ...args: any[]) {
    const id: string = v4();
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
   */
  abstract bus<ResponseType>(ctx: ApiFormat): Promise<ApiResponse<ResponseType>>;

  /**
   * Custom error mapped for request if allowed extecution time eluded.
   *
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
   */
  log(method: logMethod, log: Log, ...others: any[]) {

  }
}

export type logMethod = 'debug' | 'info' | 'error' | 'warn' | 'trace';
