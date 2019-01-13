export enum ElectronActions {
  // action to exit electron application
  Exit = '[Electron] Service Exit',
  // action to relaunch application
  Relaunch = '[Electron] Service Relaunch',
  // action to update
  Update = '[Electron] Service Update',
  // database sync
  DatabaseSync = '[Electron] Service DatabaseSync',
  // reset liensce
  LiensceReset = '[Electron] Service LiensceReset',
}

export interface ElectronOperations<res> {
  operation: ElectronActions;
  data: res;
}
