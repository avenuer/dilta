import { ModelBase } from './models.base';
import { FactoryProvider, Inject, Injectable } from '@dilta/core';
import { electronDatabase, Embededb } from '@dilta/emdb';
import {
  Auth,
  EntityNames,
  Expense,
  Manager,
  Parent,
  Receipt,
  Record,
  School,
  Setting,
  Student,
  Subject,
  User,
  Promotion
  } from '@dilta/shared';

/** Token For RXDB leveldown instance */
export const EmbededDatabaseToken = 'RXDB_LOCAL';

// @Inject(EmbededDatabaseToken) public database:  Promise<Embededb>

/**
 * Service priovider for user Authentication storage and operations
 *
 * @export
 * @class AuthService
 * @extends {ModelBase<Auth>}
 */
@Injectable()
export class AuthService extends ModelBase<Auth> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Auth, database);
  }

  /** redacts to protect user fields */
  santizeAuth(authId: Auth) {
    if (!authId) {
      return authId;
    }
    const { hash, updatedAt, password, ...allowed } = authId;
    return allowed;
  }
}

/**
 * ManagerService for users offline storage
 *
 * @export
 * @class ManagerService
 * @extends {ModelBase<Manager>}
 */
@Injectable()
export class ManagerService extends ModelBase<Manager> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Manager, database);
  }
}

/**
 * Class responsble for parent offline storage operations
 *
 * @export
 * @class ParentService
 * @extends {ModelBase<Parent>}
 */
@Injectable()
export class ParentService extends ModelBase<Parent> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Parent, database);
  }
}

/**
 * responsible for the database operations of receipts
 *
 * @export
 * @class ReceiptService
 * @extends {ModelBase<Receipt>}
 */
@Injectable()
export class ReceiptService extends ModelBase<Receipt> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Receipt, database);
  }
}

/**
 * responsible for school database operations
 *
 * @export
 * @class SchoolService
 * @extends {ModelBase<School>}
 */
@Injectable()
export class SchoolService extends ModelBase<School> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.School, database);
  }
}

/**
 * responsible for student score database operations
 *
 * @export
 * @class ScoreService
 * @extends {ModelBase<Score>}
 */
@Injectable()
export class SubjectService extends ModelBase<Subject> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Subject, database);
  }
}

/**
 * responsible for student biodata crud operations
 *
 * @export
 * @class StudentService
 * @extends {ModelBase<Student>}
 */
@Injectable()
export class StudentService extends ModelBase<Student> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Student, database);
  }
}

/**
 * responsible for the users [ teachers ] database operations
 *
 * @export
 * @class UserService
 * @extends {ModelBase<User>}
 */
@Injectable()
export class UserService extends ModelBase<User> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.User, database);
  }
}

/**
 * responsible for users and school settings database operations
 *
 * @export
 * @class SettingService
 * @extends {ModelBase<Settings>}
 */
@Injectable()
export class SettingService extends ModelBase<Setting> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Setting, database);
  }
}

/**
 * responsible for expenses database operations
 *
 * @export
 * @class ExpenseService
 * @extends {ModelBase<Expense>}
 */
@Injectable()
export class ExpenseService extends ModelBase<Expense> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Expense, database);
  }
}

/**
 * responsible teachers own records for database.
 *
 * @export
 * @class RecordService
 * @extends {ModelBase<Record>}
 */
@Injectable()
export class RecordService extends ModelBase<Record> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Record, database);
  }
}


/**
 * Responsible for student academic promtion history
 *
 * @export
 * @class PromotionService
 * @extends {ModelBase<Promotion>}
 */
@Injectable()
export class PromotionService extends ModelBase<Promotion> {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>
  ) {
    super(EntityNames.Promotion, database);
  }
}

/** Provider Token Mapping  */
const embededDBProvider: FactoryProvider = {
  provide: EmbededDatabaseToken,
  useFactory: electronDatabase
};

export const databaseServices = [
  embededDBProvider,
  AuthService,
  ManagerService,
  ParentService,
  ReceiptService,
  SchoolService,
  SubjectService,
  StudentService,
  UserService,
  SettingService,
  ExpenseService,
  RecordService,
  PromotionService
];
