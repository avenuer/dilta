/**
 * school Preset containing various courses and interface
 *
 * @export
 * @interface SchoolPresetBio
 */

export interface SchoolPresetBio {
  /**
   * name of the type of presets
   *
   * @type {string}
   * @memberof SchoolPresetBio
   */
  name: string;
  /**
   * level presets
   *
   * @type {Level}
   * @memberof SchoolPresetBio
   */
  levels: Level[];

  /**
   * authorization per level for the school
   *
   * @type {Permission[]}
   * @memberof SchoolPresetBio
   */
  permision: Permission[];
}

/**
 * interface documentation for all
 * presets available
 *
 * @export
 * @interface SchoolPreset
 */
export interface SchoolPreset {
  [key: string]: SchoolPresetBio;
}


/**
 * interface for the individual level presets
 *
 * @export
 * @interface Level
 */
export interface Level {
  /**
   * name of the level
   *
   * @type {string[]}
   * @memberof Level
   */
  name: string;
  /**
   * courses over at the level
   *
   * @type {string[]}
   * @memberof Level
   */
  courses: string[];
}

/**
 * permission interface for authorization for each level
 *
 * @export
 * @interface Permission
 */
export interface Permission {
  /**
   * name of the level
   *
   * @type {string}
   * @memberof Permission
   */
  name: string;

  /**
   * value for the permision level
   *
   * @type {string}
   * @memberof Permission
   */
  value?: string | number;
}
