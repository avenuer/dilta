import { Record, Student, Subject } from './models';

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
  name: string;
}

export interface SubjectRecords {
  record: Record;
  data: AcademicSubject[];
}

export enum AcademicActions {
  SubjectRecord = '[ACADEMIC]  FIND SubjectRecords',
  UpdateSubjectRecord = '[ACADEMIC]  UPDATE SubjectRecords'
}
