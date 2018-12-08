import { AuthSecurity } from './auth-security';
import { AuthDetailsNotFondError, InValidPasswordError } from './errors';
import { Action, Injectable } from '@dilta/core';
import { AuthService, SchoolService } from '@dilta/database';
import { Auth, AuthTokenUser, USER_AUTH } from '@dilta/shared';

@Injectable()
export class AuthController {
  constructor(private sec: AuthSecurity, private auth: AuthService, private sch: SchoolService) {}

  /**
   * signs in the user and response with jwt token
   *
   * @param {Partial<Auth>} auth
   * @memberof AuthController
   */
  @Action(USER_AUTH.Login)
  async login(auth: Partial<Auth>): Promise<AuthTokenUser> {
    const details = await this.auth.retrieve$({ username: auth.username });
    if (!details) {
      throw new AuthDetailsNotFondError();
    }
    const isValid = await this.sec.checkPassword(
      auth.password,
      details.password
    );
    if (!isValid) {
      throw new InValidPasswordError();
    }
    details.school = await this.sch.retrieve$({ id: details.school as string });
    const response = await this.sec.cleanAndGenerateToken(details);
    return response;
  }

  /**
   * signup the user and response with jwt token
   *
   * @param {Partial<Auth>} auth
   * @memberof AuthController
   */
  @Action(USER_AUTH.Signup)
  async signUp(auth: Partial<Auth>): Promise<AuthTokenUser> {
    const saved = await this.sec.save(auth as any);
    return await this.sec.cleanAndGenerateToken(saved as any);
  }

  /**
   * verifies the jwt token and return the decrypted details
   *
   * @param {string} token
   * @memberof AuthController
   */
  @Action(USER_AUTH.Verify)
  async verify(token: string): Promise<AuthTokenUser> {
    const details = await this.sec.decryptToken(token);
    const response = await this.sec.cleanAndGenerateToken(details as any);
    return response;
  }
}
