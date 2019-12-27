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
  manager_model: RxCollection<Manager>;
  parent_model: RxCollection<Parent>;
  receipt_model: RxCollection<Receipt>;
  school_model: RxCollection<School>;
  student_model: RxCollection<Student>;
  subject_model: RxCollection<Subject>;
  user_model: RxCollection<User>;
  auth_model: RxCollection<Auth>;
  preference_model: RxCollection<Settings>;
  expense_model: RxCollection<Expense>;
  record_model: RxCollection<Record>;
  academic_setting_model: RxCollection<Record>;
}

/** interface mapping the mainframe object to its key value type info  */
export type Embededb = CollectionMaps & RxDatabase;
