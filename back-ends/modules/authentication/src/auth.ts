import { AuthController } from './controller';
import { BcryptSecurity } from './bcrypt';
import { Santization } from './santization';
import { Injectable, Module } from '@dilta/core';
import { UtilModule } from '@dilta/util';
import { DroneNetworkModule } from '@ditla/network';

@Module({
  imports: [UtilModule, DroneNetworkModule],
  providers: [AuthController, BcryptSecurity, Santization]
})
@Injectable()
export class AuthorizationModule {
  constructor() {}
}
