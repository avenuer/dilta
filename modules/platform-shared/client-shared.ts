import { RecordSheetConfig } from './models';
import { TermPreset } from './preset';
import { StudentRecordMergeTermSheet } from './academics';

export const DateFormat = 'DD-MMM-YYYY';

export enum AppliationOutputDir {
  program = 'dilta',
  setup = 'setup'
}

/**
 * confiiguration of keys to display and allowed
 * ations on it
 *
 * @export
 * @interface KeysConfig
 */
export interface KeysConfig {
  key: string;
  title?: string;
  evaluated?: true;
  editable: boolean;
  type: string;
  send?: boolean; // used instead of changing used to send grid data out
  config?: {
    max: number;
    min: number;
    map?(currVal: number): string | number;
  };
  default?: string | number;
}

/**
 * configuration for mathematical expression
 * for columns configuration
 *
 * @export
 * @interface MathExp
 */
export type MathExp = string;

/**
 * generates an academic report grid config that matches school desire
 * TODO:// replace AcademicReportCardGridConfig with this function generally.
 * @export
 * @param {boolean} [liberal=false]
 * @returns {KeysConfig[]}
 */
export function AcademicReportCardGridConfigFactory(
  liberal: boolean = false
): KeysConfig[] {
  const config: KeysConfig[] = [
    { key: 'subject', title: 'Subject', type: 'string', editable: false },
    { key: 'firstCa', title: '1st/C.A', type: 'number', editable: false },
    { key: 'secondCa', title: '2nd/C.A', type: 'number', editable: false },
    { key: 'exam', title: 'Exam', type: 'number', editable: false },
    { key: 'total', title: 'Total', type: 'number', editable: false },
    { key: 'avg', title: 'C/Avg', type: 'number', editable: false }
  ];
  if (!liberal) {
    config.push({
      key: 'classPosition',
      title: 'Position',
      type: 'string',
      editable: false
    });
  }
  config.push({
    key: 'grade',
    title: 'Grade',
    type: 'string',
    editable: false
  });
  if (!liberal) {
    config.push({
      key: 'comment',
      title: 'Remarks',
      type: 'string',
      editable: false
    });
  }
  return config;
}

export const AcademicReportCardGridConfig: KeysConfig[] = [
  { key: 'subject', title: 'Subject', type: 'string', editable: false },
  { key: 'firstCa', title: '1st/C.A', type: 'number', editable: false },
  { key: 'secondCa', title: '2nd/C.A', type: 'number', editable: false },
  { key: 'exam', title: 'Exam', type: 'number', editable: false },
  { key: 'total', title: 'Total', type: 'number', editable: false },
  { key: 'avg', title: 'C/Avg', type: 'number', editable: false },
  { key: 'classPosition', title: 'Position', type: 'string', editable: false },
  { key: 'grade', title: 'Grade', type: 'string', editable: false },
  { key: 'comment', title: 'Remarks', type: 'string', editable: false }
];

export const LevelStaticDetailsGridConfig: KeysConfig[] = [
  { key: 'no', title: 'N/O', type: 'number', editable: false, send: true },
  { key: 'name', title: 'Class', type: 'string', editable: false, send: true },
  { key: 'male', title: 'Male', type: 'string', editable: false, send: true },
  {
    key: 'female',
    title: 'Female',
    type: 'string',
    editable: false,
    send: true
  },
  { key: 'total', title: 'Total', type: 'string', editable: false, send: true }
];

export const StudentGridConfig: KeysConfig[] = [
  { key: 'no', title: 'N/O', type: 'number', editable: false, send: true },
  { key: 'name', title: 'Name', type: 'string', editable: false, send: true },
  {
    key: 'gender',
    title: 'Gender',
    type: 'string',
    editable: false,
    send: true
  },
  {
    key: 'parentPhone',
    title: 'Parent PhoneNo',
    type: 'string',
    editable: false,
    send: true
  },
  {
    key: 'admissionNo',
    title: 'Admission No',
    type: 'string',
    editable: false,
    send: true
  },
  {
    key: 'dob',
    title: 'Date of Birth',
    type: 'string',
    editable: false,
    send: true
  }
];

export const RecordGridConfig: KeysConfig[] = [
  { key: 'no', title: 'N/O', type: 'number', editable: false, send: true },
  { key: 'class', title: 'Class', type: 'string', editable: false, send: true },
  {
    key: 'subject',
    title: 'Subject',
    type: 'string',
    editable: false,
    send: true
  },
  { key: 'term', title: 'Term', type: 'string', editable: false, send: true },
  {
    key: 'session',
    title: 'Session',
    type: 'string',
    editable: false,
    send: true
  }
];

export const UsersGridConfig: KeysConfig[] = [
  { key: 'no', title: 'N/O', type: 'number', editable: false, send: true },
  { key: 'name', title: 'Name', type: 'string', editable: false, send: true },
  {
    key: 'phoneNo',
    title: 'Phone No',
    type: 'string',
    editable: false,
    send: true
  },
  {
    key: 'gender',
    title: 'Gender',
    type: 'string',
    editable: false,
    send: true
  },
  { key: 'class', title: 'Class', type: 'string', editable: false, send: true },
  {
    key: 'subject',
    title: 'Subject',
    type: 'string',
    editable: false,
    send: true
  }
];

export const defaultSubjectConfig: RecordSheetConfig = {
  exam: {
    max: 70,
    title: 'Examination'
  },
  firstCa: {
    max: 15,
    title: 'First C.A'
  },
  secondCa: {
    max: 15,
    title: 'Second C.A'
  }
};

export interface SubjectGridFactory {
  config: KeysConfig[];
  expression: string;
}

export function subjectGridFactory({
  secondCa,
  firstCa,
  exam
}: RecordSheetConfig): SubjectGridFactory {
  let expression = 'firstCa + exam';
  const keyConfigs: KeysConfig[] = [
    { key: 'no', title: 'N/O', type: 'number', editable: false, send: true },
    { key: 'name', title: 'Name', send: true, editable: false, type: 'string' },
    {
      key: 'firstCa',
      title: firstCa.title,
      send: false,
      editable: true,
      type: 'number',
      config: {
        max: firstCa.max,
        min: 0
      }
    }
  ];
  if (typeof secondCa === 'object' && secondCa) {
    expression = 'firstCa + secondCa + exam';
    keyConfigs.push({
      title: secondCa.title,
      key: 'secondCa',
      send: false,
      editable: true,
      type: 'number',
      config: {
        max: secondCa.max,
        min: 0
      }
    });
  }
  keyConfigs.push(
    {
      title: exam.title,
      key: 'exam',
      send: false,
      editable: true,
      type: 'number',
      config: {
        max: exam.max,
        min: 0
      }
    },
    {
      title: 'Total',
      key: 'total',
      send: false,
      editable: false,
      type: 'number',
      evaluated: true
    }
  );
  return { config: keyConfigs, expression };
}

export const SubjectGridConfig: KeysConfig[] = [
  { key: 'no', title: 'N/O', type: 'number', editable: false, send: true },
  { key: 'name', title: 'Name', send: true, editable: false, type: 'string' },
  {
    key: 'firstCa',
    title: 'First C.A',
    send: false,
    editable: true,
    type: 'number',
    config: {
      max: 15,
      min: 0
    }
  },
  {
    title: 'Second C.A',
    key: 'secondCa',
    send: false,
    editable: true,
    type: 'number',
    config: {
      max: 15,
      min: 0
    }
  },
  {
    title: 'Exam',
    key: 'exam',
    send: false,
    editable: true,
    type: 'number',
    config: {
      max: 70,
      min: 0
    }
  },
  {
    title: 'Total',
    key: 'total',
    send: false,
    editable: false,
    type: 'number',
    evaluated: true
  }
];

export type PrintDataHeader = { title: string; dataKey: string } | string;

export interface PrintData<T> {
  columns: PrintDataHeader[];
  rows: T[];
}

export interface PrintDataConfig {
  filename: string;
  map?: (doc: any, height: number) => PrinterDocHeader;
  startY?: number;
  margin?: number;
}

export interface PrinterDocHeader {
  doc: any;
  height: number;
}

export const ParentChildren: KeysConfig[] = [
  { key: 'no', title: 'N/O', type: 'number', editable: false },
  { key: 'name', title: 'Name', type: 'string', editable: false },
  { key: 'gender', title: 'gender', type: 'string', editable: false },
  { key: 'class', title: '1st C.A', type: 'string', editable: false },
  {
    key: 'admissionNo',
    title: 'Admission No',
    type: 'string',
    editable: false
  },
  { key: 'dob', title: 'D.O.B', type: 'string', editable: false }
];

/**
 * Updates the table to configure displayed
 * tables different terms
 *
 * @param {TermPreset} term
 * @memberof AcademicReportCardGridComponent
 */
export function updateReportKeys(term: TermPreset, keys: KeysConfig[]) {
  const tableKeys = keys.map(e => e.key);
  if (!tableKeys.includes('firstTerm')) {
    keys.push({
      key: 'firstTerm',
      title: '1/Term',
      type: 'number',
      editable: false
    });
  }
  if (!tableKeys.includes('secondTerm') && term > TermPreset.First) {
    keys.push({
      key: 'secondTerm',
      title: '2/Term',
      type: 'number',
      editable: false
    });
  }
  if (!tableKeys.includes('thirdTerm') && term > TermPreset.Second) {
    keys.push({
      key: 'thirdTerm',
      title: '3/Term',
      type: 'number',
      editable: false
    });
  }

  if (!tableKeys.includes('cumAvg')) {
    keys.push({
      key: 'cumAvg',
      title: 'C/AVG',
      type: 'number',
      editable: false
    });
    keys.push({
      key: 'cumGrade',
      title: 'C/Grd',
      type: 'string',
      editable: false
    });
  }
  return keys;
}

export function cummulativeAverage(term: TermPreset) {
  return (obj: StudentRecordMergeTermSheet) => {
    if (term === TermPreset.Second) {
      const total = (obj.firstTerm || 0) + (obj.secondTerm || 0);
      if (total === 0) {
        return total;
      }
      return total / 2;
    }
    if (term === TermPreset.Third) {
      const total =
        (obj.firstTerm || 0) + (obj.secondTerm || 0) + (obj.thirdTerm || 0);
      if (total === 0) {
        return total;
      }
      return total / 3;
    }
    return obj.firstTerm || 0;
  };
}

export function fixDuplicateKeys(config: KeysConfig[]) {
  const keys = [];
  console.log(keys, config);
  return config.filter(cfg => {
    if (!keys.includes(cfg.key)) {
      keys.push(cfg.key);
      return true;
    }
    return false;
  });
}
