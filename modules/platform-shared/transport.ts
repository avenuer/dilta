
/**
 * Channels for communication of Request and Response.
 *
 * @export
 * @enum {number}
 */
export enum Transport {
  Request = 'Transport Request',
  Response = 'Transport Response'
}


/**
 * paramaters all response must have
 *
 * @export
 * @interface BaseResponse
 */
export interface BaseResponse {
  time: number;
  status: API_STATUS_RESPONSE;
  reqId: string;
  code: API_STATUS_CODE;
}

/**
 * FInd Query Params used for pad=gination or altering
 * query responses
 *
 * @export
 * @interface FindQueryParam
 */
export interface FindQueryParam {
  skip: number;
  limit: number;
  sort: string;
}


/**
 * Api Formats
 *
 * @export
 * @interface ApiFormat
 */
export interface ApiFormat {

  /**
   * unique Id for the request
   *
   * @type {string}
   * @memberof ApiFormat
   */
  id: string;

  /**
   * Action Name to be executed
   *
   * @type {string}
   * @memberof ApiFormat
   */
  action: string;

  /**
   * functional arguments to be called by the remote function
   *
   * @type {any[]}
   * @memberof ApiFormat
   */
  data: any[];
}

/**
 * API RESPONSE STATUS CODE
 *
 * @export
 * @enum {number}
 */
export enum API_STATUS_CODE {
  Failure = 401,
  Success = 200
}

/**
 * API RESPONSE TEXT
 *
 * @export
 * @enum {number}
 */
export enum API_STATUS_RESPONSE {
  Success = 'success',
  Failure = 'failure'
}

/**
 * Interface for Api Response Interface
 *
 * @export
 * @interface ApiResponse
 * @template T
 */
export interface ApiResponse<T> extends BaseResponse {
  /** response textual information */
  status: API_STATUS_RESPONSE;
  /** time of response */
  time: number;
  /** typeof data response */
  data?: T;
  /** error message */
  error?: string;
}


/**
 * Formats api response for the authnetication
 *
 * @template T
 * @param {T} details
 * @returns
 */
export function successResponse<T>(reqId: string, details:  T): ApiResponse<T> {
  return {
    reqId,
    code: API_STATUS_CODE.Success,
    data: details,
    status: API_STATUS_RESPONSE.Success,
    time: Date.now()
  };
}


/**
 * Authentication Data response interface
 *
 * @export
 * @interface AuthDataResponse
 * @template T
 */
export interface AuthDataResponse<T> {
  token: string;
  details: Partial<T>;
}


/**
 * formats failure response for authentication
 *
 * @param {(Error | string)} err
 * @returns
 */
export function failureResponse(reqId: string, err: Error | string): ApiResponse<any> {
  return {
    reqId,
    code: API_STATUS_CODE.Failure,
    error: err.toString(),
    status: API_STATUS_RESPONSE.Failure,
    time: Date.now()
  };
}
