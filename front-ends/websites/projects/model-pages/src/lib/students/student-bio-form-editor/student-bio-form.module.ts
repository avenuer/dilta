import { NgModule } from '@angular/core';

import { StudentBioFormEditorComponent } from './student-bio-form-editor.component';
import { ClientSharedModule, MaterialModule } from 'client-shared';
import { StudentBiodataEditorModule } from '../student-biodata-editor/student-biodata-editor.module';

@NgModule({
  imports: [ClientSharedModule, MaterialModule, StudentBiodataEditorModule],
  exports: [StudentBioFormEditorComponent],
  declarations: [StudentBioFormEditorComponent],
  providers: []
})
export class StudentBioFormEditorModule {}
