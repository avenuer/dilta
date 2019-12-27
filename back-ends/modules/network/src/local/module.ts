import { Module, Injectable } from '@dilta/core';
import { localExecute, localHive } from './hive-transport';
import { DroneNetworkModule, networkBootStrap } from '../module';

@Module({
  imports: [DroneNetworkModule],
  providers: [localExecute]
})
@Injectable()
export class LocalHiveTranportModule {
  constructor() {}
}

export function localBootstrap<T>(name: string, bootclass: T) {
  return networkBootStrap(name, bootclass, localHive.register.bind(localHive));
}
