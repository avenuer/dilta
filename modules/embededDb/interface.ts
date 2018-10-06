import {
  Auth,
  Expense,
  Manager,
  Parent,
  Receipt,
  School,
  Score,
  Settings,
  Student,
  User
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
  score: RxCollection<Score>;
  user: RxCollection<User>;
  auth: RxCollection<Auth>;
  preference: RxCollection<Settings>;
  expense: RxCollection<Expense>;
}

/** interface mapping the mainframe object to its key value type info  */
export type Embededb = CollectionMaps & RxDatabase;
