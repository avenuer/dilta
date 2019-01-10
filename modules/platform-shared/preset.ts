import { cleanNumericEnums } from './shared';

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

/**
 * school dictonary interface after transformations
 *
 * @export
 * @interface SchoolDict
 */
export interface SchoolDict {
  /**
   * array of school classes
   *
   * @type {string[]}
   * @memberof SchoolDict
   */
  classes: string[];
  /**
   * array of subjects offered by schools
   *
   * @type {string[]}
   * @memberof SchoolDict
   */
  subjects: string[];
  /**
   * an object contaning various permissions for the object
   *
   * @type {Object}
   * @memberof SchoolDict
   */
  permisions: Object;
}

/**
 * Actions for PresetModule
 *
 * @export
 * @enum {number}
 */
export enum PresetAction {
  /**
   * retrieves the local govts in Nigeria
   */
  Lga = '[Preset] LOCATION LGA',

  /**
   * retrieves the States govts in Nigeria
   */
  State = '[Preset] LOCATION STATE',

  /**
   * retrieves the school categories
   */
  SchoolCategories = '[Preset] SCHOOL CATEGORIES',

  /**
   * retrieves the school preseted information by category
   */
  SchoolPreset = '[Preset] SCHOOL PRESET'
}

/**
 * grades shortcut
 *
 * @export
 * @enum {number}
 */
export enum Grades {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F'
}

/**
 * grades full comment
 *
 * @export
 * @enum {number}
 */
export enum GradesComment {
  A = 'Excellent',
  B = 'Very Good',
  C = 'Good',
  D = 'Pass',
  E = 'Fair',
  F = 'Fail'
}

/**
 * GradeSheet constiting of the short and full symbols
 *
 * @export
 * @interface GradeSheet
 */
export interface GradeSheet {
  grade: Grades;
  comment: GradesComment;
}

/**
 * term preset shows various terms available
 *
 * @export
 * @enum TermPreset
 */
export enum TermPreset {
  Lesson = 0,
  First,
  Second,
  Third
}

export enum NuseryPrimarySchoolClassPreset {
  Crech = 0,
  KG1,
  KG2,
  KG3,
  'Nusery One',
  'Nusery Two',
  'Nusery Three',
  'Primary One',
  'Primary Two',
  'Primary Three',
  'Primary Four',
  'Primary Five',
  'Primary Six'
}

export enum JuniorSecondaryClassPreset {
  'JSS One' = 211,
  'JSS Two',
  'JSS Three'
}

export enum SeniorSecondarySchoolClassPreset {
  'SSS One A' = 311,
  'SSS One B',
  'SSS One c',
  'SSS One D',
  'SSS Two A' = 411,
  'SSS Two B',
  'SSS Two C',
  'SSS Two D',
  'SSS Three A' = 511,
  'SSS Three B',
  'SSS Three C',
  'SSS Three D'
}

export enum SpecialCasesPreset {
  'Graduated' = 600,
  'Left'
}

// type for student class.
export type SchoolClass = NuseryPrimarySchoolClassPreset &
  JuniorSecondaryClassPreset &
  SeniorSecondarySchoolClassPreset &
  SpecialCasesPreset;

/** all school classes available */
export const schoolClasses = cleanNumericEnums(
  Object.keys({
    ...NuseryPrimarySchoolClassPreset,
    ...JuniorSecondaryClassPreset,
    ...SeniorSecondarySchoolClassPreset,
    ...SpecialCasesPreset
  })
);
/** all school terms available */
export const schoolTerms = cleanNumericEnums(Object.keys(TermPreset));

/**
 * maps the school Name to the corresponding value
 *
 * @export
 * @param {string} className
 * @returns
 */
export function schoolClassValue(className: string): number {
  let number;
  [
    NuseryPrimarySchoolClassPreset,
    JuniorSecondaryClassPreset,
    SeniorSecondarySchoolClassPreset,
    SpecialCasesPreset
  ].forEach(preset => {
    if (Object.keys(preset).includes(className)) {
      number = preset[className];
    }
  });
  if (typeof number !== 'number') {
    throw noClassError;
  }
  return number;
}

/**
 * Returns School Key from value
 *
 * @export
 * @param {number} classValue
 * @returns
 */
export function schoolClassValueToKey(classValue: number) {
  let schoolKey: string;
  Object.entries({
    ...NuseryPrimarySchoolClassPreset,
    ...JuniorSecondaryClassPreset,
    ...SeniorSecondarySchoolClassPreset,
    ...SpecialCasesPreset
  }).forEach(([key, value]) => {
    if (value === Number(classValue)) {
      schoolKey = key;
    }
  });
  if (typeof schoolKey !== 'string') {
    throw noClassError;
  }
  return schoolKey;
}

// Error thrown when class not found
const noClassError = new Error('class requested doesn\'t exist');

/**
 * maps the school term value to its keys
 *
 * @export
 * @param {number} termValue
 * @returns
 */
export function schoolTermValueToKey(termValue: number) {
  let termKey: string;
  Object.entries({
    ...TermPreset
  }).forEach(([key, value]) => {
    if (value === termValue) {
      termKey = key;
    }
  });
  return termKey;
}

export interface LevelPromotionScheme {
  prevLevel: SchoolClass;
  level: SchoolClass;
  nextLevel: SchoolClass;
}


/**
 * shows promotion scheeme for a particular class level
 *
 * @export
 * @param {SchoolClass} level
 * @returns {LevelPromotionScheme}
 */
export function levelPromotion(level: SchoolClass): LevelPromotionScheme {
  return {
    prevLevel: prevLevel(level),
    level,
    nextLevel: nextLevel(level)
  };
}

/**
 * the next level for promotion
 *
 * @param {SchoolClass} level
 * @returns
 */
function nextLevel(level: SchoolClass) {
  if (level === SpecialCasesPreset.Left) {
    return level === NuseryPrimarySchoolClassPreset['Primary Six'] ||
      level === JuniorSecondaryClassPreset['JSS Three'] ||
      level > 500
      ? ((SpecialCasesPreset.Graduated as any) as SchoolClass)
      : (((level + 1) as any) as SchoolClass);
  }
  return level;
}

/**
 * previous level before current level
 *
 * @param {SchoolClass} level
 * @returns
 */
function prevLevel(level: SchoolClass) {
  if (
    level !== SpecialCasesPreset.Left &&
    level !== SpecialCasesPreset.Graduated
  ) {
    if (
      level === NuseryPrimarySchoolClassPreset.Crech ||
      level === JuniorSecondaryClassPreset['JSS One']
    ) {
      return level;
    }
    if (Object.values(SeniorSecondarySchoolClassPreset).includes(level)) {
      return level < 400 ? level : (((level - 100) as any) as SchoolClass);
    }
  }
  return level;
}
