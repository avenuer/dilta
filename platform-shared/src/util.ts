/**
 * logging interface for logs
 *
 * @export
 * @interface Log
 */
export interface Log {
  /**
   * Module which serve has the scope for the logger
   *
   * @type {string}
   * @memberof Log
   */
  module?: string;
  /**
   * a string containging the loacation of the log
   * i.e LogComponent or LogService
   *
   * @type {string}
   * @memberof Log
   */
  trace: string;
  /**
   * custom log message passed to the object
   *
   * @type {string}
   * @memberof Log
   */
  message: string;
}
