import { dictSchool, schoolCategories } from './schools.preset';
import { localGovts, states } from './states.presets';
import { Action, Injectable } from '@dilta/core';
import { PresetAction, SchoolCategories } from '@dilta/shared';

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
   * school preset configurations
   *
   * @param {string} preset
   * @returns
   * @memberof PresetService
   */
  @Action(PresetAction.SchoolPreset)
  schoolPreset(preset: SchoolCategories) {
    return dictSchool(preset);
  }

}
