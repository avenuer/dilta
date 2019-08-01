import { successResponse, failureResponse } from '@dilta/shared';
import { DronesHive } from '../hive';
import { HiveProtocol, DroneLink, DroneTransportToken } from '../interfaces';
import { DiltaApp, ValueProvider } from '@dilta/core';
import * as uuid from 'uuid/v4';

// the major hive knows the drone.
// the hive also

class LocalNetworkHove {
  private localizedApps = new Map<DroneLink, DiltaApp>();
  private actionDroneLink = new Map<string, DroneLink>();

  async protocol(drone: string, [actionName, ActionParams]: [string, ...any[]]) {
    const reqId = uuid();
    console.log('this',this);
    try {
      const data = await this.localizedApps
        .get(drone)
        .app.execute(actionName, ActionParams);
      return successResponse(reqId, data);
    } catch (err) {
      return failureResponse(reqId, err);
    }
  }

  register(droneName: string, app: DiltaApp) {
    this.localizedApps.set(droneName, app);
    this.updateActions(droneName, app);
  }

  updateActions(droneName: string, { app }: DiltaApp) {
    app.actions.forEach((value, key) =>
      this.actionDroneLink.set(key, droneName)
    );
  }

  async execute(fargs: [string, ...any[]]) {
    return this.protocol(this.actionDroneLink.get(fargs[0]), fargs);
  }

  delete(droneName: string) {
    this.localizedApps.delete(droneName);
  }
}

export const localHive = new LocalNetworkHove();
/** the instanced localized hive for communication */
export const localNetworkHive = new DronesHive(localHive.protocol);

export const localExecute: ValueProvider = {
  provide: DroneTransportToken,
  useValue: localHive.execute
};
