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
export function networkBootStrap<T>(
  name: string,
  bootclass: T,
  callback?: (name: string, diltaApp: DiltaApp) => void
): DiltaApp {
  const diltaApp = bootStrap(bootclass);
  if (callback) {
    callback(name, diltaApp);
  }
  return diltaApp;
}
