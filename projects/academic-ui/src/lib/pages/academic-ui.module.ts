import { NgModule } from '@angular/core';
import { MaterialModule } from '@dilta/client-shared';

import { StudentGridPageComponent } from './student-grid-page/student-grid-page.component';
import { RecordGridPageComponent } from './record-grid-page/record-grid-page.component';
import { AcademicRecordPageComponent } from './academic-record-page/academic-record-page.component';
import { AcademicSharedUiModule } from '../components/academic-shared.module';
import { ElectronTransportModule } from '@dilta/electron-client';

@NgModule({
  imports: [
    MaterialModule,
    AcademicSharedUiModule,
    ElectronTransportModule
  ],
  declarations: [StudentGridPageComponent, RecordGridPageComponent, AcademicRecordPageComponent],
  exports: [AcademicSharedUiModule]
})
export class AcademicPageModule { }
