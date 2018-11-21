import {
  Auth,
  Expense,
  Manager,
  Parent,
  Receipt,
  School,
  Subject,
  Settings,
  Student,
  User,
  Record
} from '@dilta/shared';
import { RxCollection, RxDatabase } from 'rxdb';

/**
 * export interface for the rxcollection provided
 * in the database created
 *
 */
export interface CollectionMaps {
  manager: RxCollection<Manager>;
  parent: RxCollection<Parent>;
  receipt: RxCollection<Receipt>;
  school: RxCollection<School>;
  student: RxCollection<Student>;
  subject: RxCollection<Subject>;
  user: RxCollection<User>;
  auth: RxCollection<Auth>;
  preference: RxCollection<Settings>;
  expense: RxCollection<Expense>;
  record: RxCollection<Record>;
}

/** interface mapping the mainframe object to its key value type info  */
export type Embededb = CollectionMaps & RxDatabase;
