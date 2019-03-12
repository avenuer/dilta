import { mainframe } from './setup.mainframe';
import * as leveldown from 'leveldown';
import { join } from 'path';
import { Logger } from '@dilta/util';
import { Platform } from '@dilta/shared';

// Don't touch for version compatiblity
export const DATABASE_DIR = join(process.env.HOMEPATH, 'ditla', 'database');


/**
 * various adapters that can be used for pouch db
 *
 * @export
 * @enum {number}
 */
export enum DatabaseAdapters {
  LevelDown = 'leveldb',
  Http = 'http'
}

export interface DatabaseConfig {
  /** the typeof adapter for rxdb */
  DB_ADAPTER: string;
  /** database plugin adapters to use */
  rxDbPlugins: {}[];
  /** pouchdb options */
  options: {
    db?: (name: string) => void;
  };
}

/**
 * returns the plugins and adapter to be use for eachPlatform
 *
 * @export
 * @param {boolean} isDesktop
 * @returns {DatabaseConfig}
 */
export function dbConfigFactory(isDesktop: boolean): DatabaseConfig {
  /** pouchdb options */
  const options = {};
  if (isDesktop) {
    options['db'] = name => (leveldown as any)(join(DATABASE_DIR, name));
    return {
      options,
      DB_ADAPTER: DatabaseAdapters.LevelDown,
      rxDbPlugins: [
        require('pouchdb-adapter-leveldb'),
        require('pouchdb-adapter-http')
      ]
    };
  }
  return {
    options,
    DB_ADAPTER: DatabaseAdapters.Http,
    rxDbPlugins: [require('pouchdb-adapter-http')]
  };
}

export async function electronDatabase() {
  /** initalize the database once alone */
  //
  const { DB_ADAPTER, rxDbPlugins, options } = dbConfigFactory(
    process.env.PLATFORM === Platform.Desktop
  );
  const logger = new Logger();
  try {
    logger.debug({
      message: `setting up database at ${DATABASE_DIR} `,
      trace: 'electron-instance::',
      module: ' EmbededDatabase'
    });
    return await mainframe(DB_ADAPTER, options, rxDbPlugins, logger);
  } catch (error) {
    logger.error(
      {
        message: `Error setting up database at ${DATABASE_DIR} `,
        trace: 'electron-instance::',
        module: ' EmbededDatabase'
      },
      error
    );
    process.exit(1);
  }
}
