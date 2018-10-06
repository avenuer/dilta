import { Module, Injectable } from '@dilta/core';
import { AuthController } from './auth';
import { AuthBcryptSecurity } from './auth-bcrypt';
import { AuthSecurity } from './auth-security';
import { LiensceCrypto } from './crypto';
import { EmbededLiensceService } from './embed-liensce';
import { Keytar } from './keys.program';
import { LiensceSecurity } from './liensce';
import { UtilModule, Logger } from '@dilta/util';
import { DatabaseModule } from '@dilta/database';

@Module({
  imports: [UtilModule, DatabaseModule],
  providers: [
    AuthController,
    AuthBcryptSecurity,
    AuthSecurity,
    LiensceCrypto,
    EmbededLiensceService,
    Keytar,
    LiensceSecurity
  ]
})
@Injectable()
export class SecurtityModule {
  constructor() {}
}
