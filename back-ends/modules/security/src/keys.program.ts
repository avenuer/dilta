import { to } from 'await-to-js';
import { deletePassword, getPassword, setPassword } from 'keytar';
import { Logger } from '@dilta/util';
import { PlatformShared, SchoolEncryptedData, LIENSCE_KEY } from '@dilta/shared';
import { Injectable, Action } from '@dilta/core';

/** the appicaton name on the platform */
export const APPLICATION_NAME = PlatformShared.ApplicationName;

/** the school liensce  key account */
export const APPLICATION_SCHOOL_KEY = `${APPLICATION_NAME}:SCHOOL:LIENSCEKEY`;

@Injectable()
export class Keytar {
  constructor(private logger: Logger) {}

  /**
   * saves the liensce key to open the application and to
   * confirm it's validity
   *
   * @param {SchoolEncryptedData} key encrypted liensce key for the application
   * @returns
   */
  async saveLiensceKey(key: SchoolEncryptedData): Promise<SchoolEncryptedData> {
    this.logger.debug({
      message: `saveLiensceKey(key): saving program liensce key to os keystore`,
      trace: 'saveLiensceKey',
      module: 'SecurityModule'
    });
    await to(
      setPassword(APPLICATION_NAME, APPLICATION_SCHOOL_KEY, JSON.stringify(key))
    );
    return key;
  }

  /**
   * retrieves the application liensce key for the application
   *
   * @returns
   */
  async liensceKey(): Promise<SchoolEncryptedData> {
    this.logger.debug({
      message: `retriving the program liensce key`,
      trace: 'liensceKey',
      module: 'SecurityModule'
    });
    return JSON.parse(await getPassword(APPLICATION_NAME, APPLICATION_SCHOOL_KEY));
  }

  /**
   * deletes the save liensce key for the application
   *
   * @returns
   */
  @Action(LIENSCE_KEY.Delete)
  deleteLiensceKey() {
    this.logger.debug({
      message: `deleting the liensceKey from the keystore`,
      trace: 'deleteLiensceKey',
      module: 'SecurityModule'
    });
    return deletePassword(APPLICATION_NAME, APPLICATION_SCHOOL_KEY);
  }
}

export const SavingLiensceKeyError = new Error(
  ' Error while Setting liensce Key '
);

// TODO: better error validation for expected operations
/** error displayed if the liensce is not found in the database */
export const keyNotFoundError = new Error(
  `liensce key for the application not found`
);
