import * as preset from '../preset';

describe('@dilta/shared', () => {
  describe('parentRelationToKey', () => {
    it('should return the actual key of the string or number value', () => {
      expect(preset.parentRelationToKey(preset.ParentRelationship.Parent)).toBe(
        'Parent'
      );
      expect(
        preset.parentRelationToKey(`${preset.ParentRelationship.Parent}`)
      ).toBe('Parent');
    });
    it('should throw error if keyvalue for string or number not found', () => {
      expect(() => preset.parentRelationToKey(1000)).toThrowError(
        preset.parentRelationToKeyError.message
      );
    });
  });

  describe('WorkingCategoriesRelationToKey', () => {
    it('should return the actual key of the string or number value', () => {
      expect(
        preset.WorkingCategoriesRelationToKey(
          preset.WorkingCategory.Entreprenuer
        )
      ).toBe('Entreprenuer');
      expect(
        preset.WorkingCategoriesRelationToKey(
          `${preset.WorkingCategory.Entreprenuer}`
        )
      ).toBe('Entreprenuer');
    });
    it('should throw error if keyvalue for string or number not found', () => {
      expect(() => preset.WorkingCategoriesRelationToKey(1000)).toThrowError(
        preset.WorkingCategoriesRelationToKeyError.message
      );
    });

    describe('schoolClassValue', () => {
      it('should return the actual value of the string key name', () => {
        expect(preset.schoolClassValue('JSS One')).toBe('Entreprenuer');
      });
      it('should throw error if value for the key is not found', () => {
        expect(() => preset.schoolClassValue('JSS Fourier')).toThrowError(
          preset.noClassError.message
        );
      });
    });

    describe('schoolTermValueToKey', () => {
      it('should return the actual termkey key for the value passed', () => {
        expect(preset.schoolTermValueToKey(preset.TermPreset.First)).toBe(
          'First'
        );
      });
      it('should throw error if key for the value passed is not found', () => {
        expect(() => preset.schoolTermValueToKey(5000)).toThrowError(
          preset.noTermKeyError.message
        );
      });
    });

    describe('levelPromotion', () => {
      it('should call nextLevel and prevLevel to calculate the levelpromotion scheme', () => {
        const {
          NuseryPrimarySchoolClassPreset,
          JuniorSecondaryClassPreset,
          levelPromotion
        } = preset;
        jest
          .spyOn(preset, 'prevLevel')
          .mockReturnValue(NuseryPrimarySchoolClassPreset['Primary Five']);
        jest
          .spyOn(preset, 'nextLevel')
          .mockReturnValue(JuniorSecondaryClassPreset['JSS One']);
        expect(
          levelPromotion(NuseryPrimarySchoolClassPreset['Primary Six'])
        ).toEqual({
          prevLevel: NuseryPrimarySchoolClassPreset['Primary Five'],
          level: NuseryPrimarySchoolClassPreset['Primary Six'],
          nextLevel: JuniorSecondaryClassPreset['JSS One']
        } as preset.LevelPromotionScheme);
      });
    });

describe('nextLevel', () => {
it('should not promote the special cases level', () => {
  const { nextLevel } = preset;
const { Left, Graduated } = preset.SpecialCasesPreset;
expect(nextLevel(Left)).toEqual(Left);
expect(nextLevel(Graduated)).toEqual(Graduated);
});
it('should promote all terminal classes to graduated', () => {

});
});

  });
});
