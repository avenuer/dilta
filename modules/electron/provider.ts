import { Action, Injectable } from '@dilta/core';
import { BrowserWindow, app, dialog } from 'electron';
import {
  ElectronActions,
  ElectronOperations,
  ReplicationEvents,
  Synchronization
} from '@dilta/shared';
import { EmbededLiensceService, Keytar } from '@dilta/security';
import { PROGRAM_WINDOW_CONFIG, SETUP_WINDOW_CONFIG } from './config';

import { ElectronDatabaseSync } from './electron-db-sync';
import { ElectronUpdate } from './electron-update';
import { Logger } from '@dilta/util';

const REMOTE_DATABASE = process.env.REMOTE_DATABASE;

@Injectable()
export class ElectronService {
  constructor(
    private log: Logger,
    private liensce: EmbededLiensceService,
    private keytar: Keytar,
    private sync: ElectronDatabaseSync,
    private updater: ElectronUpdate
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

  @Action(ElectronActions.Update)
  async updateElectron(): Promise<ElectronOperations<string>> {
    this.updater.checkforUpdate(BrowserWindow.getFocusedWindow());

    return {
      operation: ElectronActions.Update,
      data: 'Marker application checking for update at the background'
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

  async validateLiensceUsage() {
    const dialogTitle = `Marker Liensce`;
    const { boque, school } = await this.liensce.currentLiensce();
    const { error, warn } = await this.liensce.validateLiensceUsage(
      school.id,
      boque
    );
    if (error) {
      dialog.showErrorBox(dialogTitle, error.message);
      app.exit(0);
    }
    if (typeof warn === 'string') {
      dialog.showMessageBox({ message: warn, title: dialogTitle });
    }
  }
}
