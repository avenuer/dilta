import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientSharedModule, MaterialModule } from 'client-shared';

import { AcademicRecordConfigComponent } from './academic-record-config.component';

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule, ClientSharedModule],
  exports: [AcademicRecordConfigComponent],
  declarations: [AcademicRecordConfigComponent],
  providers: []
})
export class AcademicRecordConfigModule {}
