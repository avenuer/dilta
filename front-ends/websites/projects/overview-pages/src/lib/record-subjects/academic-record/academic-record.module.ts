import { NgModule } from '@angular/core';

import { AcademicRecordComponent } from './academic-record.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'client-shared';

@NgModule({
    imports: [ReactiveFormsModule, MaterialModule],
    exports: [AcademicRecordComponent],
    declarations: [AcademicRecordComponent],
})
export class AcademicRecordModule { }
