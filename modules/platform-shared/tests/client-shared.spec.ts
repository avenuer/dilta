import * as clientShared from '../client-shared';
import { RecordSheetConfig } from '../models';
import { TermPreset } from '../preset';

describe('@dilta/shared', () => {
  describe('subjectGridFactory', () => {
    it('should not add secondCA to the grid', () => {
      const gridConfig: RecordSheetConfig = {
        firstCa: {
          max: 30,
          title: 'FirstCA'
        },
        exam: {
          max: 70,
          title: 'Examination'
        }
      };
      const { config, expression } = clientShared.subjectGridFactory(
        gridConfig
      );
      expect(expression).toEqual('firstCa + exam');
      config.forEach(kc => {
        if (kc.key === 'firstCa') {
          expect(kc.title).toEqual(gridConfig.firstCa.title);
          expect(kc.config.max).toEqual(gridConfig.firstCa.max);
        }
        if (kc.key === 'exam') {
          expect(kc.title).toEqual(gridConfig.exam.title);
          expect(kc.config.max).toEqual(gridConfig.exam.max);
        }
      });
      expect(config.findIndex(kc => kc.key === 'secondCa')).toBeLessThan(0);
    });
    it('should add secondCA to the grid', () => {
      const gridConfig: RecordSheetConfig = {
        firstCa: {
          max: 15,
          title: 'FirstCA'
        },
        secondCa: {
          max: 15,
          title: 'SecondCa'
        },
        exam: {
          max: 70,
          title: 'Examination'
        }
      };
      const { config, expression } = clientShared.subjectGridFactory(
        gridConfig
      );
      expect(expression).toEqual('firstCa + exam');
      config.forEach(kc => {
        if (kc.key === 'firstCa') {
          expect(kc.title).toEqual(gridConfig.firstCa.title);
          expect(kc.config.max).toEqual(gridConfig.firstCa.max);
        }
        if (kc.key === 'secondCa') {
          expect(kc.title).toEqual(gridConfig.secondCa.title);
          expect(kc.config.max).toEqual(gridConfig.secondCa.max);
        }
        if (kc.key === 'exam') {
          expect(kc.title).toEqual(gridConfig.exam.title);
          expect(kc.config.max).toEqual(gridConfig.exam.max);
        }
      });
      expect(config.findIndex(kc => kc.key === 'secondCa')).toBeGreaterThan(-1);
    });

    describe('academicReportConfigFactory', () => {

      it('should not add secondCA to the keysconfig[]', () => {
        const gridConfig: RecordSheetConfig = {
          firstCa: {
            max: 15,
            title: 'FirstCA'
          },
          exam: {
            max: 70,
            title: 'Examination'
          }
        };
        const keys = clientShared.academicReportConfigFactory(gridConfig, TermPreset.First);
        expect(keys.findIndex((kv) => kv.key === 'secondCa')).toBeLessThan(0);
      });

      it('should add secondCA to the keysconfig[]', () => {
        const gridConfig: RecordSheetConfig = {
          firstCa: {
            max: 15,
            title: 'FirstCA'
          },
          secondCa: {
            max: 15,
            title: 'SecondCa'
          },
          exam: {
            max: 70,
            title: 'Examination'
          }
        };
        const keys = clientShared.academicReportConfigFactory(gridConfig, TermPreset.First);
        expect(keys.findIndex((kv) => kv.key === 'secondCa')).toBeGreaterThan(-1);
      });

      it('should add first term if current term is greater than first term', () => {
        const gridConfig: RecordSheetConfig = {
          firstCa: {
            max: 15,
            title: 'FirstCA'
          },
          exam: {
            max: 70,
            title: 'Examination'
          }
        };
        let keys = clientShared.academicReportConfigFactory(gridConfig, TermPreset.Second);
        expect(keys.findIndex((kv) => kv.key === 'firstTerm')).toBeGreaterThan(-1);
        keys = clientShared.academicReportConfigFactory(gridConfig, TermPreset.First);
        expect(keys.findIndex((kv) => kv.key === 'firstTerm')).toBeLessThan(0);

      });
      it('should add second term if current term is greater than second term', () => {
        const gridConfig: RecordSheetConfig = {
          firstCa: {
            max: 30,
            title: 'FirstCA'
          },
          exam: {
            max: 70,
            title: 'Examination'
          }
        };
        let keys = clientShared.academicReportConfigFactory(gridConfig, TermPreset.Third);
        expect(keys.findIndex((kv) => kv.key === 'secondTerm')).toBeGreaterThan(-1);
        keys = clientShared.academicReportConfigFactory(gridConfig, TermPreset.Second);
        expect(keys.findIndex((kv) => kv.key === 'secondTerm')).toBeLessThan(0);
        keys = clientShared.academicReportConfigFactory(gridConfig, TermPreset.First);
        expect(keys.findIndex((kv) => kv.key === 'secondTerm')).toBeLessThan(0);

      });

    });
  });
});
