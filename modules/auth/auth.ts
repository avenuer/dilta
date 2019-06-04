import { AuthController } from './controller';
import { BcryptSecurity } from './bcrypt';
import { Santization } from './santization';
import { Injectable, Module } from '@dilta/core';
import { DatabaseModule } from '@dilta/database';
import { UtilModule } from '@dilta/util';

@Module({
  imports: [UtilModule, DatabaseModule],
  providers: [AuthController, BcryptSecurity, Santization]
})
@Injectable()
export class AuthorizationModule {
  constructor() {}
}
