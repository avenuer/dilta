import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

import { LienscePageComponent } from './liensce-page.component';
import { SchoolBiodataEditorComponent } from 'projects/admin-uis/src/lib/components/school-biodata-editor/school-biodata-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WebTransportModule } from 'projects/client-shared/src/lib/web-transport.module';
import { NgxUploaderModule } from 'ngx-uploader';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    WebTransportModule,
    NgxUploaderModule
  ],
  declarations: [SchoolBiodataEditorComponent, LienscePageComponent],
  providers: []
})
export class WebLienscePageModule {}
