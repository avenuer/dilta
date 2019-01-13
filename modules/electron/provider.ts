import { Logger } from '@dilta/util';
import { app } from 'electron';
import { Action, Injectable } from '@dilta/core';
import { ElectronActions, ElectronOperations } from '@dilta/shared';
import { EmbededLiensceService, Keytar } from '@dilta/security';
import { SETUP_WINDOW_CONFIG, PROGRAM_WINDOW_CONFIG } from './config';

@Injectable()
export class ElectronService {
  constructor(
    private log: Logger,
    private liensce: EmbededLiensceService,
    private keytar: Keytar
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
  }

  @Action(ElectronActions.Update)
  async update(): Promise<ElectronOperations<string>> {
    return {
      operation: ElectronActions.Update,
      data: 'Electron Update check started'
    };
  }

  @Action(ElectronActions.DatabaseSync)
  async databaseSync(): Promise<ElectronOperations<string>> {
    return {
      operation: ElectronActions.DatabaseSync,
      data: 'Database Synchronization started'
    };
  }

  @Action(ElectronActions.LiensceReset)
  async resetLiensce(): Promise<ElectronOperations<string>> {
    const lienseReset = await this.keytar.deleteLiensceKey();
    if (lienseReset) {
      app.relaunch();
      app.exit();
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
