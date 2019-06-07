import { Module, Injectable } from '@dilta/core';
import { HttpDroneTransport } from './drone-transport';
import { httpHiveTransport } from './hive-transport';
import { DroneTransportToken } from '../interfaces';

@Module({
  imports: [],
  providers: [
      { provide: DroneTransportToken, useValue: HttpDroneTransport }
  ]
})
@Injectable()
export class HttpHiveTranportModule {
  constructor() {}
}
