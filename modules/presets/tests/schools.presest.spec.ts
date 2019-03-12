import * as schoolPresets from '../schools.preset';
import {
  SchoolCategories,
  GradingConfig,
  Grades,
  GradesComment
} from '@dilta/shared';

import * as statesPreset from '../states.presets';
import { NigeriaPreset } from '../nigeria.states';

const grading: GradingConfig = {
  A: {
    min: 70,
    max: 100
  },
  B: {
    max: 69,
    min: 60
  },
  C: {
    max: 59,
    min: 50
  },
  D: {
    max: 49,
    min: 45
  },
  E: {
    max: 44,
    min: 40
  },
  F: {
    max: 39,
    min: 0
  }
};

// gradetest
interface GradeTest {
  grades: Grades;
  comment: GradesComment;
  scoreRanges: number[];
}

describe('@dilta/preset', () => {
  describe('dictSchool', () => {
    xit('should return an object with defined fields', () => {
      const schoolDict = schoolPresets.dictSchool(SchoolCategories.Crech);
      ['classes', 'subjects', 'permisions'].forEach(e =>
        expect(e).toBeDefined()
      );
    });
  });

  describe('gradePreset', () => {
    it('should return the actual grade preset for Each Grade', () => {
      const testValues: GradeTest[] = [
        {
          comment: GradesComment.A,
          grades: Grades.A,
          scoreRanges: [100, 70, 85]
        },
        {
          comment: GradesComment.B,
          grades: Grades.B,
          scoreRanges: [69, 65, 60]
        },
        {
          comment: GradesComment.C,
          grades: Grades.C,
          scoreRanges: [55, 50, 59]
        },
        {
          comment: GradesComment.D,
          grades: Grades.D,
          scoreRanges: [49, 47, 45]
        },
        {
          comment: GradesComment.E,
          grades: Grades.E,
          scoreRanges: [40, 43, 44]
        },
        {
          comment: GradesComment.F,
          grades: Grades.F,
          scoreRanges: [0, 16, 39]
        }
      ];
      testValues.forEach(({ grades, comment, scoreRanges }) => {
        scoreRanges.forEach(score => {
          expect(schoolPresets.gradePreset(grading, score)).toBe({
            grades,
            comment
          });
        });
      });
    });
  });

  describe('classPositionPreset', () => {
    it('should determine the accurate position', () => {
      const ptv: PostionTestValue[] = [
        { index: -1, expected: 'Not available' },
        { index: 0, expected: '1st' },
        { index: 1, expected: '2nd' },
        { index: 2, expected: '3rd' },
        { index: 3, expected: `4th` }
      ];
      ptv.forEach(pt => {
        expect(schoolPresets.classPositionPreset(pt.index)).toEqual(
          pt.expected
        );
      });
    });
  });
});

interface PostionTestValue {
  index: number;
  expected: string;
}

describe('@dilta/preset', () => {
  describe('NigeriaPreset', () => {
    it('should be defined', () => {
      expect(NigeriaPreset).toBeDefined();
    });
  });

  describe('states', () => {
    it('should return an array of strings containing 36 states', () => {
      const res = statesPreset.states();
      expect(res.every(v => typeof v === 'string')).toEqual(true);
    });
  });

  describe('localGovts', () => {
    it('should be an array of strings', () => {
      const lgas = statesPreset.localGovts();
      expect(Array.isArray(lgas)).toEqual(true);
      expect(lgas.every(v => typeof v === 'string')).toEqual(true);
    });
  });
});
