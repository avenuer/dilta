import { NgModule } from '@angular/core';

import { LevelStaticDetailsComponent } from './level-static-details.component';
import { DyanmicDatagridModule } from 'dynamic-grid';

@NgModule({
  imports: [DyanmicDatagridModule],
  exports: [LevelStaticDetailsComponent],
  declarations: [LevelStaticDetailsComponent],
  providers: []
})
export class LevelStaticDetailsModule {}
