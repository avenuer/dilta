import { cleanNumericEnums } from './shared';

export enum ParentRelationship {
  Parent,
  Guardian,
  others
}

export const parentRelationships = cleanNumericEnums(
  Object.keys(ParentRelationship)
);

export function parentRelationToKey(value: string | number) {
  let valueKey;
  value = Number(value);
  parentRelationships.forEach(key => {
    if (ParentRelationship[key] === value) {
      valueKey = key;
    }
  });
  if (!value) {
    throw parentRelationToKeyError;
  }
  return valueKey;
}

/**
 * error thrown if the value doesn't match any key on ParentRelationship enum
 */
export const parentRelationToKeyError = new Error(
  `key for the inputed value doesn't exit on ParentRelationship`
);

export enum WorkingCategory {
  'Civil Servant',
  'Private Sector',
  'Entreprenuer',
  'Trader',
  'Others'
}

export const workingCategories = cleanNumericEnums(
  Object.keys(WorkingCategory)
);

export function WorkingCategoriesRelationToKey(value: string | number) {
  let valueKey;
  value = Number(value);
  workingCategories.forEach(key => {
    if (workingCategories[key] === value) {
      valueKey = key;
    }
  });
  if (!value) {
    throw WorkingCategoriesRelationToKeyError;
  }
  return valueKey;
}

/**
 * error thrown if the value doesn't match any key on WorkingCategory enum
 */
export const WorkingCategoriesRelationToKeyError = new Error(
  `key for the inputed value doesn't exit on WorkingCategory`
);

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
export type SchoolClass = NuseryPrimarySchoolClassPreset |
  JuniorSecondaryClassPreset |
  SeniorSecondarySchoolClassPreset |
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
export const noClassError = new Error(`class requested doesn't exist`);

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
  if (!termKey) {
    throw noTermKeyError;
  }
  return termKey;
}

/**
 * School Term macthing key or value not found
 */
export const noTermKeyError = new Error(`School Term macthing key or value not found`);

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
export function nextLevel(level: SchoolClass): SchoolClass {
  // if students is in school else just change to left or graduated
  if (level !== SpecialCasesPreset.Left && level !== SpecialCasesPreset.Graduated) {
    // promotes all students in terminal classes to the next class
    // note: departments cannot be determined for promoted JSS students
    if (level === NuseryPrimarySchoolClassPreset['Primary Six'] ||
    level === JuniorSecondaryClassPreset['JSS Three'] || level > 500) {
      return SpecialCasesPreset.Graduated;
    }
    // all students in lower classes below the SSS classes are promoted below
    if (level < 300) {
      return level + 1;
    }
    // SSS classes are promoted with the code below
    return level + 100;
  }
  return level;
}

/**
 * previous level before current level
 *
 * @param {SchoolClass} level
 * @returns
 */
export function prevLevel(level: SchoolClass) {
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
