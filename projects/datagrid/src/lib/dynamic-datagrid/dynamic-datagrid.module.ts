import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { DynamicDataGridComponent } from './dynamic-datagrid.component';

@NgModule({
  imports: [CommonModule, ClarityModule],
  exports: [DynamicDataGridComponent],
  declarations: [DynamicDataGridComponent],
  providers: []
})
export class DyanmicDatagridModule {}
