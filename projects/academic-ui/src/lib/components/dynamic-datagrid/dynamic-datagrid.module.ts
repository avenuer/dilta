import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule, MatInputModule } from '@angular/material';
import { DynamicDataGridComponent } from './dynamic-datagrid.component';

@NgModule({
  imports: [CommonModule, MatTableModule, MatInputModule ],
  exports: [DynamicDataGridComponent],
  declarations: [DynamicDataGridComponent],
  providers: []
})
export class DyanmicDatagridModule {}
