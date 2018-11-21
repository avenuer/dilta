import { Student } from './models';

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
