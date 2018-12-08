import { Injectable } from '@angular/core';
import { TransportService } from '@dilta/electron-client';
import {
  Auth,
  AuthTokenUser,
  Login,
  USER_AUTH
  } from '@dilta/shared';

@Injectable()
export class ClientAuthService {
  constructor(
    private transport: TransportService
  ) {}

  /** api request to login */
  login(details: Login) {
    return this.transport.execute<AuthTokenUser>(USER_AUTH.Login, details);
  }

  /** api request to sing user up */
  signup(details: Partial<Auth>) {
    return this.transport.execute<AuthTokenUser>(USER_AUTH.Signup, details);
  }

  /** verifys the user the token if valid */
  verify(token: string) {
    return this.transport.execute<AuthTokenUser>(USER_AUTH.Verify, token);
  }
}
