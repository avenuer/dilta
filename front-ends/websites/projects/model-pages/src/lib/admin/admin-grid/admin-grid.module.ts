import { NgModule } from '@angular/core';
import { DyanmicDatagridModule } from 'dynamic-grid';
import { MaterialModule } from 'client-shared';

import { AdminUserBiodataGridComponent } from './admin-grid.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
    imports: [DyanmicDatagridModule, MatTableModule, MatPaginatorModule, MaterialModule],
    exports: [AdminUserBiodataGridComponent],
    declarations: [AdminUserBiodataGridComponent],
    providers: [],
})
export class AdminUserBiodataGridModule { }
