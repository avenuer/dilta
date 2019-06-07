import { Injectable, Inject } from '@dilta/core';
import {
  DroneTransport,
  HivePortOperationType,
  HivePortRequest,
  HiveResponse
} from '../interfaces';
import fetch from 'node-fetch';

/** TOken to inject the host address for sub modules  */
export const HttpHiveAddressToken = Symbol(`HttpHiveAddressToken`);

/** error thrown when HttpHiveAddress is missing  */
export const HttpHiveAddressError = new Error(
  `Http Hive address is needed for host transport`
);


/**
 * Drone Transport mechanism over HTTP scheme
 *
 * @export
 * @class HttpDroneTransport
 * @implements {DroneTransport}
 */
@Injectable()
export class HttpDroneTransport implements DroneTransport {
  constructor(@Inject(HttpHiveAddressToken) private hiveAddress: string) {
    if (typeof this.hiveAddress !== 'string') {
      throw HttpHiveAddressError;
    }
  }


  /**
   * register actions on the hive
   *
   * @param {string[]} actions
   * @returns
   * @memberof HttpDroneTransport
   */
  async register(actions: string[]) {
    const request = await fetch(this.hiveAddress, {
      method: 'POST',
      body: JSON.stringify({
        actions,
        operation: HivePortOperationType.Dock
      } as HivePortRequest),
      headers: { 'Content-Type': 'application/json' }
    });
    return request.json();
  }


  /**
   * to unregister the host itself from it's hive
   *
   * @returns
   * @memberof HttpDroneTransport
   */
  async unregister() {
    const request = await fetch(this.hiveAddress, {
      method: 'POST',
      body: JSON.stringify({
        operation: HivePortOperationType.Dock
      } as HivePortRequest),
      headers: { 'Content-Type': 'application/json' }
    });
    return request.json();
  }


  /**
   * to forward across to the hive
   *
   * @template T
   * @param {string} action
   * @param {*} args
   * @returns {Promise<HiveResponse<T>>}
   * @memberof HttpDroneTransport
   */
  async forward<T>(action: string, ...args): Promise<HiveResponse<T>> {
    const request = await fetch(this.hiveAddress, {
      method: 'POST',
      body: JSON.stringify({
        operation: HivePortOperationType.Forward,
        actions: [action, ...args]
      } as HivePortRequest),
      headers: { 'Content-Type': 'application/json' }
    });
    return request.json();
  }
}
