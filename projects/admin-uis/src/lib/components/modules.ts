import { AdminBiodataEditorComponent } from './admin-biodata-editor/admin-biodata-editor.component';
import { LargeUserProfileComponent } from './large-user-profile/large-user-profile.component';
import { ManagersBiodataEditorComponent } from './managers-biodata-editor/managers-biodata-editor.component';
import { ParentBiodataEditorComponent } from './parent-biodata-editor/parent-biodata-editor.component';
import { SchoolBiodataEditorComponent } from './school-biodata-editor/school-biodata-editor.component';
import { SmallUserProfileComponent } from './small-user-profile/small-user-profile.component';
import { StudentBiodataEditorComponent } from './student-biodata-editor/student-biodata-editor.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dilta/client-shared';
import { NgxUploaderModule } from 'ngx-uploader';

const admins = [
  AdminBiodataEditorComponent,
  LargeUserProfileComponent,
  SmallUserProfileComponent
];

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, NgxUploaderModule, MaterialModule],
  declarations: admins,
  exports: [...admins, MaterialModule]
})
export class AdminUiSharedModule {}

const schools = [ManagersBiodataEditorComponent, SchoolBiodataEditorComponent];

@NgModule({
  imports: [ReactiveFormsModule, MaterialModule, CommonModule, NgxUploaderModule],
  declarations: schools,
  exports: [...schools, MaterialModule]
})
export class SchoolUiSharedModule {}

const parents = [ParentBiodataEditorComponent];

@NgModule({
  imports: [ReactiveFormsModule, MaterialModule],
  declarations: parents,
  exports: parents
})
export class ParentUiSharedModule {}

const students = [StudentBiodataEditorComponent];

@NgModule({
  imports: [ReactiveFormsModule, MaterialModule],
  declarations: students,
  exports: students
})
export class StudentUiSharedModule {}
