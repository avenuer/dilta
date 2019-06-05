import { Action, Injectable, Injector, bootStrap } from '@dilta/core';
import { SchoolService, StudentService } from '@dilta/database';

import { Keytar } from '../keys.program';
import { LiensceSecurity } from '../liensce';
import {
  EmbededLiensceService,
  liensceExpiredError,
  platformOperationNotAllowed
} from '../embed-liensce';
import { SecurtityModule } from '../security';
import { async } from 'q';
import { Boque, LiensceSubscription, SchoolClass } from '@dilta/shared';

describe('@dilta/security', () => {
  describe('EmbededLiensceService', () => {
    const injector = bootStrap(SecurtityModule);
    const embedLiensce: EmbededLiensceService = injector.injector.get(
      EmbededLiensceService
    );

    describe('isLiensceVaild', () => {
      it('should throw error if liensce is expired', () => {
        expect(() =>
          embedLiensce.isLiensceVaild({
            expiretimestamp: Date.now() - 1000
          } as any)
        ).toThrowError(liensceExpiredError.message);
      });
      it('should not throw error if liensce is expired', () => {
        expect(() =>
          embedLiensce.isLiensceVaild({
            expiretimestamp: Date.now() + 5000
          } as any)
        ).not.toThrowError(liensceExpiredError.message);
      });
    });

    describe('currentLiensce', () => {
      it('should throw error if the platform is not desktop platform', () => {
        expect(() => embedLiensce.currentLiensce()).toThrowError(
          platformOperationNotAllowed.message
        );
      });
      it('should retrieve the lienscekey and return it after validation', async () => {
        const encryptedSchool = { expiretimestamp: Date.now() + 1000 };
        const keytarMock: Partial<Keytar> = {
          liensceKey: () => encryptedSchool as any
        };
        (embedLiensce as any).keytar = keytarMock;
        expect(await embedLiensce.currentLiensce()).toEqual(encryptedSchool);
        (embedLiensce as any).keytar = undefined;
      });
    });
    describe('saveLiensce', () => {
      it('should throw error if the platform is not desktop platform', () => {
        expect(() =>
          embedLiensce.saveLiensce('embededed random token')
        ).toThrowError(platformOperationNotAllowed.message);
      });
      it('should save lienscekey to the database and computer to desktop', () => {
        const schoolSvcMock: SchoolService = injector.injector.get(
          SchoolService
        );
        const encryptedSchool = {
          expiretimestamp: Date.now() + 1000,
          school: { id: 'schoolID' }
        };
        jest
          .spyOn(embedLiensce, 'verifyLiensce')
          .mockImplementationOnce(token => encryptedSchool);
        jest.spyOn(schoolSvcMock, 'create$').mockImplementationOnce(s => s);
        const keytarMock: Partial<Keytar> = {
          saveLiensceKey: jest.fn((decrypted: any) => decrypted)
        };
        expect(embedLiensce.saveLiensce('embededed random token')).toEqual(
          encryptedSchool
        );
      });
    });
    describe('verifyLiensce', () => {
      it('should return the verified liensce key', async () => {
        const liensceSecMock: LiensceSecurity = injector.injector.get(
          LiensceSecurity
        );
        const encryptedSchool = {
          expiretimestamp: Date.now() + 1000,
          school: { id: 'schoolID' }
        };
        jest.spyOn(liensceSecMock, 'decryptLiensce').mockResolvedValue(encryptedSchool);
        expect(await embedLiensce.verifyLiensce('encryptedtoken')).toEqual(encryptedSchool);
      });

      it('should reject the error during the operation', async () => {
        const liensceSecMock: LiensceSecurity = injector.injector.get(
          LiensceSecurity
        );
        const mockedError = new Error('the thrown error');
        jest.spyOn(liensceSecMock, 'decryptLiensce').mockRejectedValueOnce(mockedError);
        expectAsync(embedLiensce.verifyLiensce('encryptedtoken')).toBeRejectedWith(mockedError);
      });
    });
    describe('validateLiensceUsage', () => {
      const schoolId = 'schoolId';
      const boque: Boque = {
        allowed: 2,
        paid: 1,
        subscription: LiensceSubscription.Basic
      }
      it('should ', () => {
        // em
      });
    });
    // jest.
  });
});

interface StudMock {
class: SchoolClass;
}
const studentsMock: StudMock[] = [];
