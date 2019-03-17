import { Injectable, Module } from '@dilta/core';
import { bootStrap } from '@dilta/core';
import { SecurtityModule } from '@dilta/security';
import { AcademicModules } from '@dilta/academics';
import { PresetModule } from 'modules/presets';


@Module({
  imports: [SecurtityModule, PresetModule, AcademicModules],
  providers: []
})
@Injectable()
export class ServerModule {}

export function serverBoot(callback: (error: Error) => void) {
  try {
    return bootStrap(ServerModule);
  } catch (error) {
    callback(error);
  }
}
