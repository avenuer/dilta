import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AcademicGradingConfigComponent } from './academic-grading-config.component';
import { MaterialModule, ClientSharedModule } from 'client-shared';

@NgModule({
    imports: [MaterialModule, ClientSharedModule, ReactiveFormsModule],
    exports: [AcademicGradingConfigComponent],
    declarations: [AcademicGradingConfigComponent],
    providers: [],
})
export class AcademicGradingConfigModule { }