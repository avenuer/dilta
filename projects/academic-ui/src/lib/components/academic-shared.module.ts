import { NgModule } from '@angular/core';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { MaterialModule } from '@dilta/client-shared';

import { StudentGridComponent } from './student-grid/student-grid.component';
import { RecordGridComponent } from './record-grid/record-grid.component';
import { AcademicRecordComponent } from './academic-record/academic-record.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DyanmicDatagridModule } from './dynamic-datagrid/dynamic-datagrid.module';
import { AcademicReportComponent } from './academic-report/academic-report.component';
import { AcademicReportCardGridComponent } from './academic-report-card-grid/academic-report-card-grid.component';

@NgModule({
  imports: [
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    DyanmicDatagridModule
  ],
  declarations: [
    StudentGridComponent,
    AcademicReportComponent,
    RecordGridComponent,
    AcademicRecordComponent,
    AcademicReportCardGridComponent
  ],
  exports: [
    StudentGridComponent,
    RecordGridComponent,
    AcademicReportComponent,
    AcademicRecordComponent,
    AcademicReportCardGridComponent,
    MatTableModule,
    MatPaginatorModule,
    DyanmicDatagridModule
  ]
})
export class AcademicSharedUiModule {}
