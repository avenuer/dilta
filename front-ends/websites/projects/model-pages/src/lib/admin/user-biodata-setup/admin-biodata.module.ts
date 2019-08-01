import { NgModule } from '@angular/core';

import {  UserBioDataFormPageComponent } from './admin-biodata.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'client-shared';
import { AdminBiodataEditorModule } from '../admin-biodata-editor/admin-biodata-editor.module';

@NgModule({
    imports: [ReactiveFormsModule, MaterialModule, AdminBiodataEditorModule],
    exports: [UserBioDataFormPageComponent],
    declarations: [UserBioDataFormPageComponent],
    providers: [],
})
export class UserBioDataFormPageModule { }