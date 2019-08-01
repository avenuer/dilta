import { ActionProviderMap } from '@dilta/core';
import { ApiResponse } from '@dilta/shared';

/**
 * Various HiveStaus for the operations done
 *
 * @export
 * @enum {number}
 */
export enum HiveStatus {
  Registered,
  UnRegistered,
  TransportSuccess,
  TransportError
}

/**
 * The operation done in the hive
 *
 * @export
 * @enum {number}
 */
export enum HivePortOperationType {
  Dock,
  Leave,
  Ships,
  Forward
}

/**
 * Interface map for any request towards the hive
 *
 * @export
 * @interface HivePortRequest
 */
export interface HivePortRequest {
  actions: [string, ...any[]];
  operation: HivePortOperationType;
}

export type HiveActions = Map<string, ActionProviderMap>;

/**
 * interface maps for all the reponse from the hive
 *
 * @export
 * @interface HiveResponse
 * @template T
 */
export interface HiveResponse<T> {
  status: HiveStatus;
  data?: T;
  err?: string;
}

/**
 * interface map for implementing a dronetransport to deal with the host
 *
 * @export
 * @interface DroneTransport
 */
export interface DroneTransport {
  register(droneName: string, actions: string[]): Promise<HiveResponse<string>>;
  unregister(droneName: string): Promise<HiveResponse<string>>;
  forward<T>(...args): Promise<HiveResponse<T>>;
}

export type DroneLink = string;

export type HiveProtocol = (
  drone: string,
  actions: [string, ...any[]]
) => Promise<ApiResponse<any>>;

export const DroneTransportToken = Symbol(`NetworkDroneTransportToken`);

export type DroneTransportProtocol<T> = (fargs: [string, ...any[]]) => Promise<HiveResponse<T>>