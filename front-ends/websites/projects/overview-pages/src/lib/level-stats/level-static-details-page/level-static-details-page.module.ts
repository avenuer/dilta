import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LevelStaticDetailsPageComponent } from './level-static-details-page.component';
import { LevelStaticDetailsModule } from '../level-static-details/level-static-details.module';
import { MaterialModule, ClientSharedModule } from 'client-shared';

@NgModule({
  imports: [
    RouterModule,
    LevelStaticDetailsModule,
    MaterialModule,
    ClientSharedModule
  ],
  exports: [LevelStaticDetailsPageComponent],
  declarations: [LevelStaticDetailsPageComponent]
})
export class LevelStaticDetailsPageModule {}
