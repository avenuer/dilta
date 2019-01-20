export const DateFormat = 'DD-MMM-YYYY';

export enum AppliationOutputDir {
  program = 'dilta',
  setup = 'setup',
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

export const AcademicReportCardGridConfig: KeysConfig[] = [
  { key: 'no', title: 'N/O', type: 'number', editable: false },
  { key: 'subject', title: 'Subject', type: 'string', editable: false },
  { key: 'firstCa', title: '1st C.A', type: 'number', editable: false },
  { key: 'secondCa', title: '2nd C.A', type: 'number', editable: false },
  { key: 'exam', title: 'Examination', type: 'number', editable: false },
  { key: 'total', title: 'Total', type: 'number', editable: false },
  { key: 'avg', title: 'Class Average', type: 'number', editable: false },
  { key: 'classPosition', title: 'Position', type: 'string', editable: false },
  { key: 'grade', title: 'Grade', type: 'string', editable: false },
  { key: 'comment', title: 'Remarks', type: 'string', editable: false },
];

export const LevelStaticDetailsGridConfig: KeysConfig[] = [
  { key: 'no', title: 'N/O', type: 'number', editable: false, send: true },
  { key: 'name', title: 'Class', type: 'string', editable: false, send: true  },
  { key: 'male', title: 'Male', type: 'string', editable: false, send: true  },
  { key: 'female', title: 'Female', type: 'string', editable: false, send: true  },
  { key: 'total', title: 'Total', type: 'string', editable: false, send: true  },
];

export const StudentGridConfig: KeysConfig[] = [
  { key: 'no', title: 'N/O', type: 'number', editable: false, send: true },
  { key: 'name', title: 'Name', type: 'string', editable: false, send: true  },
  { key: 'gender', title: 'Gender', type: 'string', editable: false, send: true  },
  { key: 'parentPhone', title: 'Parent PhoneNo', type: 'string', editable: false, send: true  },
  { key: 'admissionNo', title: 'Admission No', type: 'string', editable: false, send: true  },
  { key: 'dob', title: 'Date of Birth', type: 'string', editable: false, send: true  },
];

export const RecordGridConfig: KeysConfig[] = [
  { key: 'no', title: 'N/O', type: 'number', editable: false, send: true },
  { key: 'class', title: 'Class', type: 'string', editable: false, send: true  },
  { key: 'subject', title: 'Subject', type: 'string', editable: false, send: true  },
  { key: 'term', title: 'Term', type: 'string', editable: false, send: true  },
  { key: 'session', title: 'Session', type: 'string', editable: false, send: true  },
];

export const UsersGridConfig: KeysConfig[] = [
  { key: 'no', title: 'N/O', type: 'number', editable: false, send: true },
  { key: 'name', title: 'Name', type: 'string', editable: false, send: true  },
  { key: 'phoneNo', title: 'Phone No', type: 'string', editable: false, send: true  },
  { key: 'gender', title: 'Gender', type: 'string', editable: false, send: true  },
  { key: 'address', title: 'Address', type: 'string', editable: false, send: true  },
];

export const SubjectGridConfig: KeysConfig[] = [
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
  map?: (doc: any) => any;
  startY?: number;
  margin?: number;
}
