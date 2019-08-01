import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientSharedModule } from 'client-shared';

import { RecordGridPageComponent } from './record-grid-page.component';
import { RecordGridModule } from '../record-grid/record-grid.module';
import { AcademicService } from '../../academic.service';

@NgModule({
  imports: [
    RouterModule,
    RecordGridModule,
    ClientSharedModule
  ],
  exports: [RouterModule],
  declarations: [RecordGridPageComponent],
  providers: [AcademicService]
})
export class RecordGridPageModule {}
