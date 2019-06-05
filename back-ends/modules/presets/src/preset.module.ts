import { PresetService } from './preset.service';
import { Injectable, Module } from '@dilta/core';

@Module({
  providers: [PresetService]
})
@Injectable()
export class PresetModule {

}
