import {
  HivePortRequest,
  HivePortOperationType,
  HiveResponse,
  HiveStatus,
  DroneLink,
  HiveProtocol
} from './interfaces';
import { Injectable } from '@dilta/core';

/**
 * THe Drone Hive which all worker drones registers
 * themselves on after initalizing
 *
 * @export
 * @class DronesHive
 */
export class DronesHive {
  private store: Map<string, DroneLink> = new Map();

  constructor(private protocol: HiveProtocol) {}

  /**
   * exectures various actions on the hive it self
   *
   * @param {HivePortRequest} req
   * @param {DroneLink} drone
   * @returns {Promise<HiveResponse<any>>}
   * @memberof DronesHive
   */
  async execute(
    req: HivePortRequest,
    drone: DroneLink
  ): Promise<HiveResponse<any>> {
    const { Dock, Forward, Leave, Ships } = HivePortOperationType;
    switch (req.operation) {
      case Forward:
        return this.forward(req.actions);
      case Dock:
        return this.register(drone, req.actions);
      case Leave:
        return await this.unregister(drone);
      case Ships:
          return this.storeActions();
      default:
        return {
          err: `${drone} tries to perform invalid operation in the hive`,
          status: HiveStatus.TransportError
        };
    }
  }


  /**
   * retrieves all the hives store actions and drones
   *
   * @returns {HiveResponse<any>}
   * @memberof DronesHive
   */
  storeActions(): HiveResponse<any> {
    return {
      data: this.store,
      status: HiveStatus.TransportSuccess
    };
  }

  /**
   * method called to register a worker drone on the network
   *
   * @param {DroneLink} drone
   * @param {string[]} actions
   * @returns {HiveResponse<string>}
   * @memberof DronesHive
   */
  register(drone: DroneLink, actions: string[]): HiveResponse<string> {
    actions.forEach(action => this.store.set(action, drone));
    return {
      data: `successfully registered ${drone} on the hive`,
      status: HiveStatus.Registered
    };
  }

  /**
   * method called to forward the current request to the drone
   * that can act on it
   *
   * @param {string[]} actions
   * @returns
   * @memberof DronesHive
   */
  async forward(actions: [string, ...any[]]) {
    // since the action is always first in the array
    const drone = this.store.get(actions[0]);
    const res = await this.protocol(drone, actions);
    return {
      data: res.data,
      err: res.error,
      status: HiveStatus.Registered
    };
  }

  /**
   * method called to remove a drone from the hivestore
   *
   * @param {string} drone
   * @returns {HiveResponse<string>}
   * @memberof DronesHive
   */
  unregister(drone: string): HiveResponse<string> {
    for (const [key, value] of this.store.entries()) {
      if (value === drone) {
        this.store.delete(key);
      }
    }
    return {
      data: `successfully unregistered ${drone} on the hive`,
      status: HiveStatus.Registered
    };
  }
}
