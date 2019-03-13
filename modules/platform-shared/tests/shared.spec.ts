import { cleanNumericEnums, enumKeysToValue } from '../shared';

enum TestNumeric {
  A,
  B,
  C
}
enum TestString {
  A = 'A',
  B = 'B',
  C = 'C'
}

const error = new Error(`key or value is missing`);

describe('@dilta/shared', () => {
  describe('cleanNumericEnums', () => {
    it('should return only the integer keys for the enum', () => {
      expect(cleanNumericEnums(Object.keys(TestNumeric)).sort()).toEqual([
        'A',
        'B',
        'C'
      ]);
    });
  });

  describe('enumKeysToValue', () => {
    it('should return the key for the numeric value', () => {
      expect(enumKeysToValue(TestNumeric, 'number')(0, error)).toEqual('A');
    });
    it('should return the key for the string value', () => {
      expect(enumKeysToValue(TestString, 'string')('B', error)).toEqual('B');
    });
  });
  it('should throw errror if key for the value is missing', () => {
    expect(() =>
      enumKeysToValue(TestString, 'string')('EB', error)
    ).toThrowError(error.message);
  });
});
