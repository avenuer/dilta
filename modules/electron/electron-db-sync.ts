import { DatabaseSyncService, EmbededDatabaseToken } from '@dilta/database';
import { Inject, Injectable } from '@dilta/core';
import { Logger } from '@dilta/util';
import { EmbededLiensceService } from '@dilta/security';
import { Embededb } from '@dilta/emdb';
import { RxCollection } from 'rxdb';
import {
  EntityNames,
  ReplicationComplete,
  ReplicationError,
  ReplicationEvents
} from '@dilta/shared';
import { format } from 'date-fns';
import { dialog, BrowserWindow } from 'electron';

@Injectable()
export class ElectronDatabaseSync extends DatabaseSyncService {
  constructor(
    @Inject(EmbededDatabaseToken) public database: Promise<Embededb>,
    private log: Logger,
    private liensce: EmbededLiensceService
  ) {
    super(database);
    // register event listners
    this.on(ReplicationEvents.Complete, this.alertComplete);
    this.on(ReplicationEvents.Error, this.alertError);
  }

  /**
   * query for documents that should be synchronized
   *
   * @param {RxCollection<any>} collection
   * @param {EntityNames} key
   * @returns
   * @memberof ElectronService
   */
  async keysReplicationConfig(collection: RxCollection<any>, key: EntityNames) {
    const liensce = await this.liensce.currentLiensce();
    if (key === EntityNames.School) {
      return collection.find({ id: liensce.school.id });
    }
    return collection.find({ school: liensce.school.id });
  }

  /**
   * responds to the complete event stream
   *
   * @param {ReplicationComplete} { State, collection, time }
   * @memberof ElectronDatabaseSync
   */
  alertComplete({ State, collection, time }: ReplicationComplete) {
    const message = `${collection} ${State} at ${format(time)}`;
    this.log.log({
      message,
      module: 'ElectronModule',
      trace: 'ElectronDatabaseSync'
    });
    dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
      message,
      type: 'info',
      title: 'Database Synchronization'
    });
  }

  /**
   * responds to the error event stream
   *
   * @param {ReplicationError} { State, collection, error, time  }
   * @memberof ElectronDatabaseSync
   */
  alertError({ State, collection, error, time }: ReplicationError) {
    const message = `${collection} ${State} at ${format(time)}`;
    this.log.log({
      message,
      module: 'ElectronModule',
      trace: 'ElectronDatabaseSync'
    });
    dialog.showErrorBox('Database Synchronization', error.message);
  }
}
