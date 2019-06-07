import { Action, Injectable } from '@dilta/core';
import {
  Auth,
  AuthTokenUser,
  AuthenticationLevels,
  USER_AUTH,
  EntityNames,
  ModelOperations,
  User
} from '@dilta/shared';
import { AuthDetailsNotFondError, InValidPasswordError } from './errors';
import { NetworkDroneService } from '@ditla/network';

import { Santization } from './santization';

@Injectable()
export class AuthController {
  constructor(private sec: Santization, private net: NetworkDroneService) {}

  /**
   * signs in the user and response with jwt token
   *
   * @param {Partial<Auth>} auth
   * @memberof AuthController
   */
  @Action(USER_AUTH.Login)
  async login(auth: Partial<Auth>): Promise<AuthTokenUser> {
    const details = await this.net.modelActionFormat<Auth>(
      EntityNames.Auth,
      ModelOperations.Retrieve
    )({ username: auth.username });
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
    const school = await this.net.modelActionFormat(
      EntityNames.School,
      ModelOperations.Retrieve
    )({ id: details.school as string });
    details.school = school;
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
    const currentUserBio = await this.net.modelActionFormat<User>(
      EntityNames.User,
      ModelOperations.Retrieve
    )({
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
