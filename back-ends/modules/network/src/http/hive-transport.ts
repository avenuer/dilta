import { ApiResponse } from '@dilta/shared';
import fetch from 'node-fetch';
import { DroneLink } from '../interfaces';


/**
 * protocol called to forward the request from the hive
 * to a drone
 *
 * @export
 * @param {DroneLink} drone
 * @param {string[]} actions
 * @returns {Promise<ApiResponse<any>>}
 */
export async function httpHiveTransport(
  drone: DroneLink,
  actions: string[]
): Promise<ApiResponse<any>> {
  const req = await fetch(drone, { method: 'POST', body: actions.toString() });
  return req.json();
}
