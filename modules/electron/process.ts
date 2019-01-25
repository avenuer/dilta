import { Injectable, Module } from '@dilta/core';
import { bootStrap } from '@dilta/core';
import { SecurtityModule } from '@dilta/security';
import { AcademicModules } from '@dilta/academics';
import { PresetModule } from 'modules/presets';

import { ElectronDatabaseSync } from './electron-db-sync';
import { ElectronUpdate } from './electron-update';
import { ElectronService } from './provider';
import { ElectronDatabaseUtilService } from './db-util';

@Module({
  imports: [SecurtityModule, PresetModule, AcademicModules],
  providers: [ElectronService, ElectronDatabaseSync, ElectronUpdate, ElectronDatabaseUtilService]
})
@Injectable()
export class ElectronModule {}

export function bootElectron(callback: (error: Error) => void) {
  try {
    return bootStrap(ElectronModule);
  } catch (error) {
    callback(error);
  }
}
