import { bootStrap } from '@dilta/core';
import { AuthorizationModule } from '../auth';
import { UtilModule } from '@dilta/util';
import { DatabaseModule } from '@dilta/database';
import { AuthController } from '../controller';
import { BcryptSecurity } from '../bcrypt';
import { Santization } from '../santization';

describe('@dilta/auth', () => {
describe('AuthorizationModule', () => {
  const { providers, injector } = bootStrap(AuthorizationModule);
  [AuthorizationModule, UtilModule, DatabaseModule, AuthController, BcryptSecurity, Santization].forEach((prov) => {
    expect(injector.get(prov) instanceof prov).toEqual(true);
  });
});
});
