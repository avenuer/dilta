import { Keytar } from './keys.program';
import { LiensceSecurity } from './liensce';
import { Action, Injectable } from '@dilta/core';
import { SchoolService, StudentService } from '@dilta/database';
import {
  LIENSCE_KEY,
  Platform,
  SchoolEncryptedData,
  schoolClasses,
  SpecialCasesPreset,
  Boque
} from '@dilta/shared';
import { isBefore } from 'date-fns';

@Injectable()
export class EmbededLiensceService {
  constructor(
    private keytar: Keytar,
    private sch: SchoolService,
    private student: StudentService,
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


  /**
   * checks for the limit of users that remains for a liensce extension
   *
   * @param {string} schoolId
   * @param {Boque} boque
   * @returns
   * @memberof EmbededLiensceService
   */
  async validateLiensceUsage(schoolId: string, boque: Boque) {
    const { Graduated, Left } = SpecialCasesPreset;
    const { data } = await this.student.find$({ school: schoolId });
    const students = data.filter(
      student => student.class !== Graduated && student.class !== Left
    );
    const allowed = boque.allowed + 1;
    if (students.length > allowed + 1) {
      return {
        error: liensceExpiredError
      };
    }
    return {
      warn: liensceLimitWarn(students.length, boque)
    };
  }
}

export const liensceExpiredError = new Error(
  `Liensce has expired, Renew Liensce or Contact program Adminstartor for More Details`
);

export const liensceLimitError = ({ paid, allowed }: Boque) =>
  new Error(
    `Program Liensce was paid for ${paid} and has a max limit ${allowed} of students please upgrade liensce`
  );

export const liensceLimitWarn = (count: number, { allowed, paid }: Boque) =>
  count > allowed - 25
    ? `liensce allows a maximum of ${allowed} while ${paid} students was paid for.
    Your current usage while require an upgrade soon`
    : false;
