import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule, ClientSharedModule } from 'client-shared';
import { AcademicRecordPageComponent } from './academic-record-page.component';
import { AcademicRecordModule } from '../academic-record/academic-record.module';
import { AcademicService } from '../../academic.service';



@NgModule({
  imports: [
    RouterModule,
    AcademicRecordModule,
    MaterialModule,
    ClientSharedModule
  ],
  exports: [RouterModule, AcademicRecordPageComponent],
  declarations: [AcademicRecordPageComponent],
  providers: [AcademicService]
})
export class AcademicPageModule {}
