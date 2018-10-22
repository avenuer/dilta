import { Logger } from '@dilta/util';
import { app, remote, screen } from 'electron';
import { Action, Injectable } from '@dilta/core';
import { ElectronActions } from '@dilta/shared';


@Injectable()
export class ElectronService {
  constructor(private log: Logger) {

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
}
