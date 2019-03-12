import { bootStrap } from '@dilta/core';
import { PresetService } from '../preset.service';
import { PresetModule } from '../preset.module';
import * as schoolPreset from '../schools.preset';
import * as statePreset from '../states.presets';
import { SchoolCategories } from '@dilta/shared';

describe('@dilta/preset', () => {
  describe('PresetModule ', () => {
    it('should bootstrap successfully and PresetService Must be defined', () => {
      const app = bootStrap(PresetModule);
      expect(app.injector.get(PresetModule)).toBeDefined();
      expect(app.injector.get(PresetService) instanceof PresetService).toEqual(
        true
      );
    });
  });

  describe('PresetService', () => {
    const presetSvc = new PresetService();
    describe('lga', () => {
      it('should call localGovts() to return all nigerian lgas', () => {
        const lgaSpy = jest.spyOn(statePreset, 'localGovts');
        presetSvc.lga();
        expect(lgaSpy).toHaveBeenCalled();
      });
    });

    describe('state', () => {
      it('should call states() to return all nigerian states', () => {
        const stateSpy = jest.spyOn(statePreset, 'states');
        presetSvc.state();
        expect(stateSpy).toHaveBeenCalled();
      });
    });

    describe('schoolCategories', () => {
      it('should to return various school categories', () => {
        expect(presetSvc.state()).toEqual(schoolPreset.schoolCategories);
      });
    });

    describe('schoolPreset', () => {
      it('should to return various school categories', () => {
        const dictSpy = jest.spyOn(schoolPreset, 'dictSchool').mockReturnThis();
        presetSvc.schoolPreset(SchoolCategories.Crech);
        expect(dictSpy).toHaveBeenCalledWith(SchoolCategories.Crech);
      });
    });
  });
});
