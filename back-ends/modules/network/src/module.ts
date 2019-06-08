import { Module, Injectable, DiltaApp, bootStrap } from '@dilta/core';
import { NetworkDroneService } from './drone';
import { UtilModule } from '@dilta/util';

@Module({
  imports: [UtilModule],
  providers: [NetworkDroneService]
})
@Injectable()
export class DroneNetworkModule {
  constructor() {}
}


/**
 * bootsrap a module over a network
 *
 * @export
 * @template T
 * @param {T} bootclass
 * @returns {DiltaApp}
 */
export function networkBootStrap<T>(bootclass: T): DiltaApp {
  const diltaApp = bootStrap(bootclass);
  const drone = diltaApp.injector.get(
    NetworkDroneService
  ) as NetworkDroneService;
  drone.register();
  return diltaApp;
}
