import { ElectronService } from './provider';
import { Injectable, Module } from '@dilta/core';
import { bootStrap } from '@dilta/core';
import { SecurtityModule } from '@dilta/security';
import { AcademicModules } from 'modules/academics/acada';
import { PresetModule } from 'modules/presets';
import { ElectronDatabaseSync } from './electron-db-sync';

@Module({
  imports: [SecurtityModule, PresetModule, AcademicModules],
  providers: [ElectronService, ElectronDatabaseSync]
})
@Injectable()
export class ElectronModule {}

export const program = bootStrap(ElectronModule);
