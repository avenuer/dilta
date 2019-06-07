import {
  Injectable,
  ReflectiveInjector,
  collateActions,
  Inject
} from '@dilta/core';

import { Logger } from '@dilta/util';
import {
  HiveStatus,
  DroneTransport,
  HiveActions,
  DroneTransportToken
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
    private injector: ReflectiveInjector,
    @Inject(DroneTransportToken) private drone: DroneTransport,
    private logger: Logger
  ) {
    this.localHive = collateActions(this.injector);
  }

  /**
   * all actions in the current module
   *
   * @readonly
   * @memberof NetworkDroneService
   */
  get actions() {
    const actions = [];
    this.localHive.forEach((map, key) => actions.push(key));
    return actions;
  }

  /**
   * method for the injected module to register itself on the hive
   *
   * @memberof NetworkDroneService
   */
  async register() {
    const response = await this.drone.register(this.actions);
    if (response.status !== HiveStatus.TransportSuccess) {
      this.logger.error({
        module: 'TransportModule',
        trace: 'NetworkDone:register',
        message: response.err
      });
      process.exit(1);
    }
  }

  /**
   * method for the un-injected module to register itself on the hive
   *
   * @memberof NetworkDroneService
   */
  async unregister() {
    const response = await this.drone.unregister();
    if (response.status !== HiveStatus.TransportSuccess) {
      this.logger.error({
        module: 'TransportModule',
        trace: 'NetworkDone:unregister',
        message: response.err
      });
      process.exit(1);
    }
  }

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
      const res = await this.drone.forward<T>(args);
      if (res.err) {
        throw res.err;
      }
      return res.data;
    };
  }
}
