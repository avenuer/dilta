import { Injectable, Inject } from '@dilta/core';

import { Logger } from '@dilta/util';
import {
  HiveActions,
  DroneTransportToken,
  DroneTransportProtocol
} from './interfaces';
import { modelActionFormat, ModelOperations, EntityNames } from '@dilta/shared';

/**
 * The drone serive used by various modules for communication
 *
 * @export
 * @class NetworkDroneService
 */
@Injectable()
export class NetworkDroneService {
  private localHive: HiveActions;
  constructor(
    @Inject(DroneTransportToken) private transport: DroneTransportProtocol<any>,
    private logger: Logger
  ) {}

  /**
   * Simpler abstraction for doing CRUD operations
   *
   * @template T
   * @param {EntityNames} model
   * @param {ModelOperations} operation
   * @returns
   * @memberof NetworkDroneService
   */
  modelActionFormat<T>(model: EntityNames, operation: ModelOperations) {
    return this.forward<T>(modelActionFormat(model, operation));
  }

  /**
   * sends the requested action to the hive with the arguments
   *
   * @template T
   * @param {string} action
   * @returns
   * @memberof NetworkDroneService
   */
  forward<T>(action: string) {
    return async (...args) => {
      this.logger.log({
        module: 'TransportModule',
        trace: 'NetworkDone:transort',
        message: `Action: ${action} \n payload: ${args.toString()}`
      });
      const res = await this.transport([action, ...args]);
      if (res.err) {
        throw res.err;
      }
      return res.data;
    };
  }
}
