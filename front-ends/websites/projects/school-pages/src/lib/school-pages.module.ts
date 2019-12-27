import { NgModule } from '@angular/core';
import { SchoolRouteModule } from './school-pages.routes';
import {  ClientSharedModule, MaterialModule } from 'client-shared';
import { SchoolBiodataEditorModule } from './school-biodata-editor/school-biodata-editor.module';
import { SchoolDataFormComponent } from './school-biodata-form/school.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    SchoolBiodataEditorModule,
    CommonModule,
    MaterialModule,
    SchoolRouteModule,
    ClientSharedModule
  ],
  exports: [SchoolDataFormComponent, SchoolBiodataEditorModule],
  declarations: [SchoolDataFormComponent]
})
export class SchoolPageModule {}
