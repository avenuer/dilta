import { Logger } from '@dilta/util';
import { app } from 'electron';
import { Action, Injectable } from '@dilta/core';
import { ElectronActions } from '@dilta/shared';
import { EmbededLiensceService } from '@dilta/security';
import { SETUP_WINDOW_CONFIG, PROGRAM_WINDOW_CONFIG } from './config';

@Injectable()
export class ElectronService {
  constructor(private log: Logger, private liensce: EmbededLiensceService) {

  }

  @Action(ElectronActions.Exit)
  exit() {
    this.log.debug({ message: 'app exiting', module: 'ElectronModule', trace: 'exit' });
    app.exit();
  }

  @Action(ElectronActions.Relaunch)
  relaunch() {
    this.log.debug({ message: 'app relaunching', module: 'ElectronModule', trace: 'relaunch' });
    app.relaunch();
    app.exit();
  }

  screenshot() {

  }

  async loadView() {
    try {
      const liensce = await this.liensce.currentLiensce();
       return  PROGRAM_WINDOW_CONFIG;
    } catch (error) {
       return SETUP_WINDOW_CONFIG;
    }
  }
}
