import { NgModule } from '@angular/core';

import { ManagerDataFormComponent } from './AdminSetup.component';
import { MaterialModule, ClientSharedModule } from 'client-shared';
import { ManagersBiodataEditorModule } from '../managers-biodata-editor/managers-biodata.module';

@NgModule({
  imports: [MaterialModule, ManagersBiodataEditorModule, ClientSharedModule],
  exports: [ManagerDataFormComponent],
  declarations: [ManagerDataFormComponent],
  providers: []
})
export class ManagerDataFormModule {}
