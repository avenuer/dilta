import { Logger } from '@dilta/util';
import { app } from 'electron';
import { Action, Injectable } from '@dilta/core';
import {
  ElectronActions,
  ElectronOperations,
  Synchronization,
  ReplicationEvents
} from '@dilta/shared';
import { EmbededLiensceService, Keytar } from '@dilta/security';
import { SETUP_WINDOW_CONFIG, PROGRAM_WINDOW_CONFIG } from './config';
import { ElectronDatabaseSync } from './electron-db-sync';

const REMOTE_DATABASE = process.env.REMOTE_DATABASE;

@Injectable()
export class ElectronService {
  constructor(
    private log: Logger,
    private liensce: EmbededLiensceService,
    private keytar: Keytar,
    private sync: ElectronDatabaseSync
  ) {}

  @Action(ElectronActions.Exit)
  exit() {
    this.log.debug({
      message: 'app exiting',
      module: 'ElectronModule',
      trace: 'exit'
    });
    app.exit();
  }

  @Action(ElectronActions.Relaunch)
  relaunch() {
    this.log.debug({
      message: 'app relaunching',
      module: 'ElectronModule',
      trace: 'relaunch'
    });
    app.relaunch();
    app.exit();
  }

  @Action(ElectronActions.DatabaseSync)
  async databaseSync(
    direction: Synchronization
  ): Promise<ElectronOperations<string>> {
    this.sync.emit(ReplicationEvents.Start, direction);
    return {
      operation: ElectronActions.DatabaseSync,
      data: 'Database Synchronization started'
    };
  }

  @Action(ElectronActions.LiensceReset)
  async resetLiensce(): Promise<ElectronOperations<string>> {
    const lienseReset = await this.keytar.deleteLiensceKey();
    if (lienseReset) {
      this.relaunch();
      return {
        operation: ElectronActions.LiensceReset,
        data: 'Program liensce reset successfully'
      };
    }
    return {
      operation: ElectronActions.LiensceReset,
      data: 'Program liensce reset Failed'
    };
  }

  async loadView() {
    try {
      const liensce = await this.liensce.currentLiensce();
      if (liensce) {
        return PROGRAM_WINDOW_CONFIG;
      }
      return SETUP_WINDOW_CONFIG;
    } catch (error) {
      return SETUP_WINDOW_CONFIG;
    }
  }
}
