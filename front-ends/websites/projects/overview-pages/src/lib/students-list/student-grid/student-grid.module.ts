import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'client-shared';
import { DyanmicDatagridModule } from 'dynamic-grid';

import { StudentGridComponent } from './student-grid.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    DyanmicDatagridModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [StudentGridComponent],
  declarations: [StudentGridComponent],
  providers: []
})
export class StudentGridModule {}
