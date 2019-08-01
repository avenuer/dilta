import { NgModule } from '@angular/core';
import { MaterialModule, ClientSharedModule } from 'client-shared';

import { UserBiodataProfileComponent } from './user-biodata-profile.component';
import { AdminBiodataEditorModule } from '../admin-biodata-editor/admin-biodata-editor.module';

@NgModule({
  imports: [AdminBiodataEditorModule, MaterialModule, ClientSharedModule],
  exports: [UserBiodataProfileComponent],
  declarations: [UserBiodataProfileComponent],
  providers: []
})
export class UserBiodataProfileModule {}
