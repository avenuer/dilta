import { mainframe } from './setup.mainframe';
import * as leveldown from 'leveldown';
import { join } from 'path';
import { Logger } from '@dilta/util';

/** the typeof adapter for rxdb */
const DB_ADAPTER = 'leveldb';
/** database plugin adapters to use */
const rxDbPlugins = [require('pouchdb-adapter-leveldb')];
/** pouchdb options */
const options = {};
const dir = join(process.env.HOMEPATH, 'ditla', 'database');
options['db'] = name => (leveldown as any)(join(dir, name));

export async function electronDatabase() {
  /** initalize the database once alone */
  const logger = new Logger();
  logger.debug({ message: `setting up database at ${dir} `, trace: 'electron-instance::', module: ' EmbededDatabase' });
  return await mainframe(DB_ADAPTER, options, rxDbPlugins, logger);
}
