import { Record, Student, Subject } from './models';
import { TermPreset, GradeSheet } from './preset';

export interface GridConfig {
  filter?: boolean;
  sortable?: boolean;
  selection?: boolean;
  sticky?: boolean;
  paginator?: GridPaginator;
}

export interface GridPaginator {
  length: number;
  count: number;
  options: number[];
}

export type StudentGrid  = keyof Student & 'no';

export interface AcademicSubject extends Subject {
  // student name.
  name: string;
}

export interface SubjectRecords {
  record: Record;
  data: AcademicSubject[];
}

export enum AcademicActions {
  SubjectRecord = '[ACADEMIC]  FIND SubjectRecords',
  UpdateSubjectRecord = '[ACADEMIC]  UPDATE SubjectRecords',
  StudentReportSheet = '[ACADEMIC]  GET StudentReportSheet',
}


export interface AcadmicRecordSheet {
  level: string;
  session: string;
  term: TermPreset;
}

export interface StudentSheet extends AcadmicRecordSheet {
  studentId: string;
}


export interface ClassSheet {
  max: number;
  min: number;
  avg: number;
  position?: string;
}

export type StudentRecordSheet =  Subject & GradeSheet;

export interface DifferentTermScores {
  firstTerm?: number;
  secondTerm?: number;
  thirdTerm?: number;
}

export type StudentRecordMergeSheet = Record & RecordSheet;
export type StudentRecordMergeTermSheet = Record & RecordSheet & DifferentTermScores;
export type RecordSheet = ClassSheet &  StudentRecordSheet;

export interface StudentReportSheet extends StudentSheet {
  biodata: Student;
  scoreSheet: RecordSheet[];
}
