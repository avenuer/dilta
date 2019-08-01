import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'client-shared';

import { ParentBiodataEditorComponent } from './parent-biodata-editor.component';

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule],
  exports: [ParentBiodataEditorComponent],
  declarations: [ParentBiodataEditorComponent],
  providers: []
})
export class ParentBiodataEditorModule {}
