import { NgModule } from '@angular/core';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { MaterialModule } from '@dilta/client-shared';

import { StudentGridComponent } from './student-grid/student-grid.component';
import { RecordGridComponent } from './record-grid/record-grid.component';
import { AcademicRecordComponent  } from './academic-record/academic-record.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DyanmicDatagridModule } from './dynamic-datagrid/dynamic-datagrid.module';


@NgModule({
  imports: [
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    DyanmicDatagridModule
  ],
  declarations: [StudentGridComponent, RecordGridComponent, AcademicRecordComponent],
  exports: [StudentGridComponent, RecordGridComponent, AcademicRecordComponent, MatTableModule,
    MatPaginatorModule, DyanmicDatagridModule]
})
export class AcademicSharedUiModule { }
