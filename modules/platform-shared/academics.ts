import { Record, Student, Subject } from './models';
import { TermPreset, GradeSheet, SchoolClass, Grades } from './preset';

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
  ClassStatDetails = '[ACADEMIC]  GET ClassStatDetails',
  PromoteClass = '[ACADEMIC]  GET PromoteClass',
  PromoteStudent = '[ACADEMIC]  GET PromoteStudent',
  StudentPromotion = '[ACADEMIC]  GET PromoteStudent',
}


export interface AcadmicRecordSheet {
  level: SchoolClass;
  session: string;
  term: TermPreset;
}

export interface StudentSheet extends AcadmicRecordSheet {
  studentId: string;
}

export interface ClassPromotion {
  level: SchoolClass;
  newLevel?: SchoolClass;
  session: string;
}

export interface PromotionSheet extends ClassPromotion {
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

export interface CumulativeRecordData {
  average: number;
  total: number;
  grade: Grades;
}

export type StudentRecordMergeSheet = Record & RecordSheet;
export type StudentRecordMergeTermSheet = Record & RecordSheet & DifferentTermScores;
export type RecordSheet = ClassSheet &  StudentRecordSheet;

export interface StudentReportSheet extends StudentSheet {
  biodata: Student;
  scoreSheet: RecordSheet[];
  cumulative?: CumulativeRecordData;
  totalStudents: number;
}

export interface GenderDistrubution {
  total: number;
  male: number;
  female: number;
}

export interface ClassDetailedStat extends GenderDistrubution {
  value: SchoolClass | any;
  name: string;
}
