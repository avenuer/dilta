import {
  Grades,
  GradesComment,
  GradeSheet,
  SchoolDict,
  GradingConfig,
  GradingRange,
  SchoolCategories
} from '@dilta/shared';


/**
 * Permission authority
 *
 * @export
 * @enum {number}
 */
export enum Permission {
  Guest = 1,
  Teacher,
  Busar,
Manager,
Propietor,
Administrator
}

/** school categories supported */
export const schoolCategories = Object.keys(SchoolCategories);

/**
 * cleans the school presets information to a nice
 * json dictionary
 *
 * @export
 * @param {} preset
 * @returns {SchoolDict}
 */
export function dictSchool(
  preset: SchoolCategories,
): SchoolDict {
  return {
    classes: [],
    subjects: [],
    permisions: Permission
  };
}



/**
 * grade preset returns the comment on the student score.
 *
 * @export
 * @param {number} score
 * @returns {string}
 */
export function gradePreset(grading: GradingConfig, score: number): GradeSheet {
  let gradeKey: string;
  Object.entries(grading).forEach(([key, value]: [string, GradingRange]) => {
    if (!gradeKey) {
      if (score >= value.min && score <= value.max) {
        gradeKey = key;
      }
    }
  });

  return {
    comment: GradesComment[gradeKey],
    grade: Grades[gradeKey]
  };
}

/**
 * maps student position in the class to comment
 *
 * @export
 * @param {number} index
 * @returns
 */
export function classPositionPreset(index: number) {
  index += 1;
  if (index === 0) {
    return 'Not available';
  }
  if (index === 1) {
    return '1st';
  }
  if (index === 2) {
    return '2nd';
  }
  if (index === 3) {
    return '3rd';
  }
  return `${index}th`;
}
