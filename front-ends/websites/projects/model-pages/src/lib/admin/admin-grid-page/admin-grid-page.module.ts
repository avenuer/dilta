import { NgModule } from '@angular/core';
import { ClientSharedModule, MaterialModule } from 'client-shared';

import { AdminGridPageComponent } from './admin-grid-page.component';
import { AdminUserBiodataGridModule } from '../admin-grid/admin-grid.module';

@NgModule({
    imports: [ClientSharedModule, MaterialModule, AdminUserBiodataGridModule],
    exports: [AdminGridPageComponent],
    declarations: [AdminGridPageComponent],
    providers: [],
})
export class AdminGridPageModule { }
