import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxUploaderModule } from 'ngx-uploader';
import { SchoolBiodataEditorComponent } from './school-biodata-editor.component';
import { ClientSharedModule, MaterialModule } from 'client-shared';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ClientSharedModule,
    MaterialModule,
    CommonModule,
    NgxUploaderModule
  ],
  declarations: [SchoolBiodataEditorComponent],
  exports: [SchoolBiodataEditorComponent]
})
export class SchoolBiodataEditorModule {}