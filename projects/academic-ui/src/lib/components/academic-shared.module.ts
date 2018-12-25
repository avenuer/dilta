import { AcademicRecordComponent } from './academic-record/academic-record.component';
import { AcademicReportCardGridComponent } from './academic-report-card-grid/academic-report-card-grid.component';
import { AcademicReportCardComponent } from './academic-report-card/academic-report-card.component';
import { AcademicReportComponent } from './academic-report/academic-report.component';
import { DyanmicDatagridModule } from './dynamic-datagrid/dynamic-datagrid.module';
import { LevelStaticDetailsComponent } from './level-static-details/level-static-details.component';
import { RecordGridComponent } from './record-grid/record-grid.component';
import { StudentGridComponent } from './student-grid/student-grid.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { MaterialModule } from '@dilta/client-shared';


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
    LevelStaticDetailsComponent,
    AcademicReportCardGridComponent,
    AcademicReportCardComponent
  ],
  exports: [
    StudentGridComponent,
    RecordGridComponent,
    AcademicReportComponent,
    AcademicRecordComponent,
    AcademicReportCardGridComponent,
    AcademicReportCardComponent,
    LevelStaticDetailsComponent,
    MatTableModule,
    MatPaginatorModule,
    DyanmicDatagridModule
  ]
})
export class AcademicSharedUiModule {}
