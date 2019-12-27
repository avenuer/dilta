import { NgModule } from '@angular/core';

import { MaterialModule, ClientSharedModule } from 'client-shared';
import { StudentBiodataEditorModule } from '../student-biodata-editor/student-biodata-editor.module';
import { StudentBioProfileComponent } from './student-bio-profile.component';

@NgModule({
    imports: [StudentBiodataEditorModule, MaterialModule, ClientSharedModule],
    exports: [StudentBioProfileComponent],
    declarations: [StudentBioProfileComponent],
    providers: [],
})
export class StudentBioProfileModule { }