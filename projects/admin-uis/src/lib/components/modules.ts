import { NgModule } from '@angular/core';
import { AdminBiodataEditorComponent } from './admin-biodata-editor/admin-biodata-editor.component';
import { LargeUserProfileComponent } from './large-user-profile/large-user-profile.component';
import { ManagersBiodataEditorComponent } from './managers-biodata-editor/managers-biodata-editor.component';
import { ParentBiodataEditorComponent } from './parent-biodata-editor/parent-biodata-editor.component';
import { SchoolBiodataEditorComponent } from './school-biodata-editor/school-biodata-editor.component';
import { SmallUserProfileComponent } from './small-user-profile/small-user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxUploaderModule } from 'ngx-uploader';
import { MaterialModule } from '@dilta/client-shared';

const admins = [
  AdminBiodataEditorComponent,
  LargeUserProfileComponent,
  SmallUserProfileComponent
];

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, NgxUploaderModule],
  declarations: admins,
  exports: admins
})
export class AdminUiSharedModule {}

const schools = [ManagersBiodataEditorComponent, SchoolBiodataEditorComponent];

@NgModule({
  imports: [ReactiveFormsModule, MaterialModule, CommonModule, NgxUploaderModule],
  declarations: schools,
  exports: schools
})
export class SchoolUiSharedModule {}

const parents = [ParentBiodataEditorComponent];

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: parents,
  exports: parents
})
export class ParentUiSharedModule {}
