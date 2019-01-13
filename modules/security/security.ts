import { AuthController } from './auth';
import { AuthBcryptSecurity } from './auth-bcrypt';
import { AuthSecurity } from './auth-security';
import { LiensceCrypto } from './crypto';
import { EmbededLiensceService } from './embed-liensce';
import { Keytar } from './keys.program';
import { LiensceSecurity } from './liensce';
import { Injectable, Module } from '@dilta/core';
import { DatabaseModule } from '@dilta/database';
import { Platform } from '@dilta/shared';
import { UtilModule } from '@dilta/util';

const embeddedProviders =
	process.env.PLATFORM === Platform.Desktop
	? [EmbededLiensceService, Keytar, LiensceSecurity]
	: [];

@Module({
  imports: [UtilModule, DatabaseModule],
  providers: [
    AuthController,
    AuthBcryptSecurity,
    AuthSecurity,
    LiensceCrypto,
    ...embeddedProviders
  ]
})
@Injectable()
export class SecurtityModule {
  constructor() {}
}
