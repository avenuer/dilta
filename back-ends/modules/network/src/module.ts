import { Module, Injectable } from '@dilta/core';
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
