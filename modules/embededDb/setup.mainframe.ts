import { authModel } from './auth.model';
import { ExpenseModel } from './expense.model';
import { managerModel } from './manager.model';
import { parentModel } from './parent.model';
import { receiptModel } from './receipt.model';
import { schoolModel } from './school.model';
import { SettingModel } from './setting.model';
import { CollectionConfig, defaultModelMiddleWare } from './shared.model';
import { studentModel } from './student.model';
import { subjectModel } from './subject.model';
import { userModel } from './user.model';
import * as RxDB from 'rxdb';
import { RxDatabase } from 'rxdb';
import { Logger } from 'modules/util';

/** Logger For Database Scope */
/** the database name for rxdb */
const DB_NAME = 'carddemodb';

/** collection configurations to be created on the database */
export const Kollections = [
  authModel,
  managerModel,
  parentModel,
  receiptModel,
  schoolModel,
  studentModel,
  subjectModel,
  userModel,
  SettingModel,
  ExpenseModel
];

/**
 * returns the intialized database connections
 *
 * @export
 * @param {string} DB_ADAPTER storage adapter
 * @param {*} [options={}] options to be passed to pouchdb
 * @param {any[]} [plugins] Arrays of pouchdb plugins
 */
export async function mainframe(
  DB_ADAPTER: string,
  options = {},
  plugins?: any[],
  logger: Logger = console as any
) {
  applyPlugins(plugins, logger);
  const db: RxDatabase = await RxDB.create({
    name: DB_NAME,
    adapter: DB_ADAPTER,
    pouchSettings: options
  });
  logger.debug({
    message: `finshed intializing the database`,
    trace: 'mainframe',
    module: 'EmbededDatabase'
  });
  await initalizeKolls(db, Kollections, logger);
  return db;
}

/**
 * it creates new collections from the array of configurations given
 * to it.
 *
 * @param {RxDatabase} db an intialize database
 * @param {CollectionConfig[]} configs kollection configurations to be created on the db
 * @returns an object containing the kollections
 */
export async function initalizeKolls(
  db: RxDatabase,
  configs: CollectionConfig<any>[],
  logger: Logger
) {
  if (!configs.length || configs.length < 1) {
    throw configsError;
  }
  for (const config of configs) {
    const options: any = config.options || defaultModelMiddleWare;
    const collection = await db.collection({
      name: config.collection || config.name,
      schema: config.schema
    });
    logger.debug({
      message: `added ${config.name} collection to the database`,
      trace: 'InitalizeKolls',
      module: 'EmbededDatabase'
    });
    Object.keys(options).forEach(key => {
      collection[key](options[key], false);
    });
  }
}

export function applyPlugins(plugins: any[], logger: Logger) {
  if (plugins) {
    plugins.forEach(RxDB.plugin);
  }
  logger.info({
    message: `setup:::mainframe: intialize rxdb plugins`,
    trace: 'applyPlugins',
    module: 'EmbededDatabase'
  });
}

/** throws error for empty of undefined config */
export const configsError = new Error(`configs array for intializing database collections
 cannot be empty or undefined.
`);
