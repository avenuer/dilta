import { LiensceCrypto } from '../crypto';
import { LiensceGenerator } from '../script/script_liensce';

describe('@dilta/security', () => {
  describe('LiensceCrypto', () => {
    const liensceCrypto = new LiensceCrypto();
    describe('encrypt', () => {
      it('should call  LiensceGenerator.encryptLiensce', () => {
        const liensceSpy = jest.spyOn(LiensceGenerator, 'encryptLiensce');
        liensceCrypto.encrypt('');
      });
      it('should stringify Object before calling LiensceGenerator.encryptLiensce', () => {
        const stringifySpy = jest.spyOn(JSON, 'stringify');
        liensceCrypto.encrypt({});
      });
    });
    describe('decrypt', () => {
      it('should call  LiensceGenerator.decryptLiensce', () => {
        const encryptedLiensceKey = 'random string';
        expect(
          liensceCrypto.decrypt(liensceCrypto.encrypt(encryptedLiensceKey))
        ).toEqual(encryptedLiensceKey);
      });
      it('should parse the string to Object after calling LiensceGenerator.decryptLiensce', () => {
        const encryptedLiensceKey = { t: 'random T' };
        const parseSpy = jest.spyOn(JSON, 'parse');
        expect(
          liensceCrypto.decrypt(liensceCrypto.encrypt(encryptedLiensceKey))
        ).toEqual(encryptedLiensceKey);
        expect(parseSpy).toHaveBeenCalled();
      });
    });
  });
});
