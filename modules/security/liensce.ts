import { LiensceCrypto } from './crypto';
import { Action, Injectable } from '@dilta/core';
import { LIENSCE_KEY, SchoolEncryptedData } from '@dilta/shared';
import { autobind } from 'core-decorators';
import { Logger } from 'modules/util';

@Injectable()
export class LiensceSecurity {
  constructor(private cryto: LiensceCrypto, public logger: Logger) {}

  /**
   * method used for encryting and create a new liensce key
   *
   * @export
   * @param {SchoolEncryptedData} target the item to encrypt
   * @returns
   */
  @Action(LIENSCE_KEY.Encrypt)
  encryptLiensce(target: SchoolEncryptedData) {
    this.logger.info({
      message: `encrypting liensce key`,
      trace: 'encryptLiensce',
      module: 'SecurityModule'
    });
    if (typeof target !== 'object') {
      throw missingEncryptedSchoolData;
    }
    return this.cryto.encrypt(target);
  }

  /**
   * decrypts and retrieves original encrypted liensce
   *
   * @export
   * @param {string} token jwt token used for decryption
   * @returns
   */
  @Action(LIENSCE_KEY.Decrypt_Service)
  decryptLiensce(token: string): SchoolEncryptedData {
    this.logger.debug({
      message: `decrypting liensce key`,
      trace: 'decryptLiensce',
      module: 'SecurityModule'
    });
    if (typeof token !== 'string') {
      throw tokenRequired;
    }
    return this.cryto.decrypt<SchoolEncryptedData>(token) as any;
  }
}

/** error thrown for missing Encrypted School Data */
export const missingEncryptedSchoolData = new Error(`missing school data [object] to
be encrypted into the liensce key`);

/** error thrown when token key is missing or invalid */
export const tokenRequired = new Error(`liensce encrypted string token is
required for decrypting liensce key`);
