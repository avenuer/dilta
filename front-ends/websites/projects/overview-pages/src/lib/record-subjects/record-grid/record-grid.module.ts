import { NgModule } from '@angular/core';

import { RecordGridComponent } from './record-grid.component';
import { MaterialModule } from 'client-shared';
import { DyanmicDatagridModule } from 'dynamic-grid';
import { MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
    imports: [MaterialModule, DyanmicDatagridModule, MatTableModule, MatPaginatorModule],
    exports: [RecordGridComponent, MaterialModule],
    declarations: [RecordGridComponent],
    providers: [],
})
export class RecordGridModule { }
