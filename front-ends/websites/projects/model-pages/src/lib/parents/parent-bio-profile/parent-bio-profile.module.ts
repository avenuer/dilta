import { NgModule } from '@angular/core';
import { MaterialModule } from 'client-shared';

import { ParentBioProfileComponent } from './parent-bio-profile.component';
import { ParentBiodataEditorModule } from '../parent-biodata-editor/parent-biodata-editor.module';

@NgModule({
  imports: [ParentBiodataEditorModule, MaterialModule],
  exports: [ParentBioProfileComponent],
  declarations: [ParentBioProfileComponent],
  providers: []
})
export class ParentBioProfileModule {}
