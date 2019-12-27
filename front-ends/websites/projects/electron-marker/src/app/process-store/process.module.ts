import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProcessEffects } from './process.effects';
import { ProcessFeatureName, ProcessActionReducer } from './process.reducer';
import { ElectronTransportModule } from '@dilta/electron-client';

@NgModule({
  imports: [
    ElectronTransportModule,
    StoreModule.forFeature(ProcessFeatureName, ProcessActionReducer),
    EffectsModule.forFeature([ProcessEffects])
  ],
  exports: [],
  providers: []
})
export class ProcessNgrxModule {}
