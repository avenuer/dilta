import { NgModule } from '@angular/core';

import { AdminBiodataEditorComponent } from './admin-biodata-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'client-shared';
import { NgxUploaderModule } from 'ngx-uploader';

@NgModule({
    imports: [ReactiveFormsModule, MaterialModule, NgxUploaderModule],
    exports: [AdminBiodataEditorComponent],
    declarations: [AdminBiodataEditorComponent],
    providers: [],
})
export class AdminBiodataEditorModule { }