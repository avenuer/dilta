import { AuthTokenUser } from '@dilta/shared';

/**
 * Interface for a successfull Authentication
 *
 */
export interface Authsuccess extends Partial<AuthTokenUser> {
    /**
     * current authentication status
     *
     */
    status: string;
    /**
     * timestamp for the successful authentication of the
     * login User
     *
     */
    timeStamp: Date | string | number;
  
    /**
     * Any Error thrown for the Auth
     *
     */
    error?: Error;
  }