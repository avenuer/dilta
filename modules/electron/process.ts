import { Injectable, Module } from '@dilta/core';
import { bootStrap } from '@dilta/core';
import { SecurtityModule } from '@dilta/security';
import { PresetModule } from 'modules/presets';
import { ElectronService } from './provider';

@Module({
  imports: [SecurtityModule, PresetModule],
  providers: [ElectronService]
})
@Injectable()
export class ElectronModule {}

export const program = bootStrap(ElectronModule);
