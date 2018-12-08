import { Auth, School } from './models';

/** interface for user token */
export interface AuthTokenUser {
  details: Auth;
  token: string;
}

/**
 * interface for the encrypted data in the database
 *
 * @export
 * @interface SchoolEncryptedData
 */
export interface SchoolEncryptedData {
  /**
   * the private apikey for the school online's connections
   *
   * @type {string}
   * @memberof SchoolEncryptedData
   */
  apikey: string;

  /**
   * School Bio Details
   *
   * @type {School}
   * @memberof SchoolEncryptedData
   */
  school: School;

  /**
   * the time for the expiring of the liensce
   *
   * @type {number}
   * @memberof SchoolEncryptedData
   */
  expiretimestamp: number;
}

/**
 * LiensceKey Related Actions
 *
 * @export
 * @enum {number}
 */
export enum LIENSCE_KEY {
  /**
   * Action to Encrypt a liensce key
   */
  Encrypt = '[Security] Encrypt Liensce',
  /**
   * Action to decrypt liensce key ti valid json object
   */
  Decrypt = '[Security] Decrypt Liensce',
  /** Decrypts the token directly....
   *
   */
  Decrypt_Service = '[Security] Decrypt Liensce',
  /** Action to retreiving the liensce key */
  Retrieve = '[Security] Retrieve Liensce',
  /** Action to setting the liensce key */
  Update = '[Security] Update Liensce',
  /** Action to deleting the liensce key */
  Delete = '[Security] Delete Liensce'
}


/**
 * User Authentication Related Actions
 *
 * @export
 * @enum {number}
 */
export enum USER_AUTH {
  /** Action to login the user */
  Login = '[Security]  Auth Login ',
  /** Action to signup the user */
  Signup = '[Security] Auth Signup  ',
  /** Action to verify the user token */
  Verify = '[Security] Auth Verify  ',
}

/**
 * interface for user login in to the program
 *
 * @export
 * @interface Login
 */
export interface Login {
  username: string;
  password: string;
}


/**
 * Interface for user auth sign up into the program
 *
 * @export
 * @interface Signup
 */
export interface Signup {
  username: string;
  password: string;
  level: string;
}
