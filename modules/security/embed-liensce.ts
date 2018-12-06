import { Keytar } from './keys.program';
import { LiensceSecurity } from './liensce';
import { Action, Injectable } from '@dilta/core';
import { SchoolService } from '@dilta/database';
import { LIENSCE_KEY, Platform, SchoolEncryptedData } from '@dilta/shared';
import { isBefore } from 'date-fns';

@Injectable()
export class EmbededLiensceService {
  constructor(
    private keytar: Keytar,
    private sch: SchoolService,
    private lsc: LiensceSecurity
  ) {}

  /**
   * Checks if Liensce is Valid;
   *
   * @param {SchoolEncryptedData} secret
   * @memberof EmbededLiensceService
   */
  isLiensceVaild(secret: SchoolEncryptedData) {
    if (isBefore(Date.now(), secret.expiretimestamp)) {
      throw liensceExpiredError;
    }
  }

  /**
   * Retrives the currently saved Liensce key
   *
   * @memberof EmbededLiensceService
   */
  @Action(LIENSCE_KEY.Retrieve)
  async currentLiensce() {
    const schoolEncrypt = await this.keytar.liensceKey();
    this.isLiensceVaild(schoolEncrypt);
    return schoolEncrypt;
  }

  /**
   * saves and update the liensce key
   *
   * @memberof EmbededLiensceService
   */
  @Action(LIENSCE_KEY.Update)
  async saveLiensce(token: string) {
    const schoolDetails = await this.verifyLiensce(token);
    const secret = await this.keytar.saveLiensceKey(schoolDetails);
    this.isLiensceVaild(secret);
    // save school details if platform is desktop
    if (process.env.PLATFORM === Platform.Desktop) {
      this.sch.create$(secret.school);
    }
    return secret;
  }

  /**
   * verifes the liense key
   *
   * @param {*} token
   * @returns
   * @memberof EmbededLiensceService
   */
  @Action(LIENSCE_KEY.Decrypt)
  verifyLiensce(token: string) {
    return new Promise<SchoolEncryptedData>((resolve, reject) => {
      try {
        resolve(this.lsc.decryptLiensce(token));
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const liensceExpiredError = new Error(
  `Liensce has expired, Renew Liensce or Contact program Adminstartor for More Details`
);
