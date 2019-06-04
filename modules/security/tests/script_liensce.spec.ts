import * as crypto from 'crypto';
import { LiensceGenerator } from '../script/script_liensce';

const {
  Algorithm,
  Password,
  encrypt,
  encryptLiensce,
  decrypt,
  decryptLiensce
} = LiensceGenerator;

describe('@dilta/security', () => {
  describe('LiensceGenerator', () => {
    describe('encrypt', () => {
      it('should create a cipher and encrypt', () => {
        const cipherSpy = jest.spyOn(crypto, 'createCipher');
        const closure = encrypt(Algorithm, Password);
        expect(typeof closure).toEqual('function');
        expect(cipherSpy).toHaveBeenCalled();
        expect(typeof closure('randomitem')).toEqual('string');
      });
    });
    describe('decrypt', () => {
      it('should create a decipher and decrypt', () => {
        const encrypted = 'randomitem';
        const decipherSpy = jest.spyOn(crypto, 'createDecipher');
        const closure = decrypt(Algorithm, Password);
        expect(typeof closure).toEqual('function');
        expect(decipherSpy).toHaveBeenCalled();
        expect(closure(encrypt(Algorithm, Password)(encrypted))).toEqual(
          encrypted
        );
      });
    });
    describe('encryptLiensce', () => {
      it('should call the encrypt method', () => {
        const encryptSpy = jest.spyOn(LiensceGenerator, 'encrypt');
        encryptLiensce({ name: '' });
        expect(encryptSpy).toHaveBeenCalled();
      });
    });
    describe('decryptLiensce', () => {
      it('should call decrypt method', () => {
        const encryptedOrg = { name: '' };
        const decryptSpy = jest.spyOn(LiensceGenerator, 'decrypt');
        expect(decryptLiensce(encryptLiensce(encryptedOrg))).toEqual(
          encryptedOrg
        );
        expect(decryptSpy).toHaveBeenCalled();
      });
    });
  });
});
