import { AuthBcryptSecurity } from './auth-bcrypt';
import { Injectable } from '@dilta/core';
import { AuthService } from '@dilta/database';
import { Auth } from '@dilta/shared';
import { autobind } from 'core-decorators';
import { sign, verify } from 'jsonwebtoken';

const JWT_ALGORITHM = process.env.JWT_ALGORITHM;
const AUDIENCE = process.env.AUDIENCE;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// TODO: implement expirey date
const JWT_OPTIONS = {
  audience: AUDIENCE,
  issuer: AUDIENCE
};

@autobind()
@Injectable()
export class AuthSecurity {
  constructor(public auth: AuthService, private crypt: AuthBcryptSecurity) {}

  /**
   * clean the auth details and generate jwt token
   *
   * @param {Auth} details
   * @returns
   * @memberof ClientAuthService
   */
  async cleanAndGenerateToken(details: Auth) {
    details = (this.auth.santizeAuth(details) as any) as Auth;
    const token = await this.createToken(details);
    return { token, details };
  }

  /** saves the user authentication */
  async save(auth: Auth) {
    const password = await  this.crypt.hashPassword(auth.password);
    auth.password = password;
    auth = await this.auth.create$(auth);
    return auth;
  }

  /** create hash for the password */
  async createHash(password: string) {
    return await this.crypt.hashPassword(password);
  }

  /** validates the user password */
  async checkPassword(password: string, hashed: string) {
    return await this.crypt.validatePassword(hashed, password);
  }

  /** creates token for the user */
  async createToken(auth: Auth) {
    const config = {
      algorithm: JWT_ALGORITHM
    };
    return new Promise<string>((resolve, reject) => {
      sign(auth, ENCRYPTION_KEY, config, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      });
    });
  }

  /** decodes the token to vaild Auth Object */
  decryptToken(token: string) {
    const config = {
      algorithms: JWT_ALGORITHM
    } as any;
    return new Promise((resolve, reject) => {
      verify(token, ENCRYPTION_KEY, config, (err, value) => {
        if (err) {
          return reject(err);
        }
        resolve((value as any) as Partial<Auth>);
      });
    });
  }
}
