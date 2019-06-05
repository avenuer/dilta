import { dictSchool, schoolCategories } from './schools.preset';
import { localGovts, states } from './states.presets';
import { Action, Injectable } from '@dilta/core';
import { PresetAction } from '@dilta/shared';

@Injectable()
export class PresetService {

  /**
   * local goverments
   *
   * @returns {string[]}
   * @memberof PresetService
   */
  @Action(PresetAction.Lga)
  lga(): string[] {
    return localGovts();
  }

  /**
   * states
   *
   * @returns {string[]}
   * @memberof PresetService
   */
  @Action(PresetAction.State)
  state(): string[] {
    return states();
  }

  /**
   * school categories
   *
   * @returns
   * @memberof PresetService
   */
  @Action(PresetAction.SchoolCategories)
  schoolCategories() {
    return schoolCategories;
  }

  /**
   * school categories
   *
   * @param {string} preset
   * @returns
   * @memberof PresetService
   */
  @Action(PresetAction.SchoolPreset)
  schoolPreset(preset: string) {
    return dictSchool(preset);
  }

  academicSetting() {}
}
