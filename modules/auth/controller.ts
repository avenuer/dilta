import { Action, Injectable } from '@dilta/core';
import {
  Auth,
  AuthTokenUser,
  AuthenticationLevels,
  USER_AUTH
} from '@dilta/shared';
import { AuthDetailsNotFondError, InValidPasswordError } from './errors';
import { AuthService, SchoolService } from '@dilta/database';

import { Santization } from './santization';

@Injectable()
export class AuthController {
  constructor(
    private sec: Santization,
    private auth: AuthService,
    private sch: SchoolService
  ) {}

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

  @Action(USER_AUTH.Delete)
  async deleteAccount(currentUserToken: string, userIdtoDelete) {
    const { details } = await this.verify(currentUserToken);
    const currentUserBio = await this.sec.user.retrieve$({
      authId: details.id
    });
    if (details.level === AuthenticationLevels.Administrator) {
      if (currentUserBio.id !== userIdtoDelete) {
        return await this.sec.removeUser(userIdtoDelete);
      }
      throw deleteCurrentUserError;
    }
    throw authLevelError;
  }
}

export const authLevelError = new Error(
  `Current user lack adminstatrive level to execute operation`
);

export const deleteCurrentUserError = new Error(
  `Current user cannot delete it's self while login`
);
