import { NgModule } from '@angular/core';
import { MaterialModule } from 'client-shared';

import { ParentFormEditorComponent } from './parent-form-editor.component';
import { ParentBiodataEditorModule } from '../parent-biodata-editor/parent-biodata-editor.module';

@NgModule({
    imports: [ParentBiodataEditorModule, MaterialModule],
    exports: [ParentFormEditorComponent],
    declarations: [ParentFormEditorComponent],
    providers: [],
})
export class ParentFormEditorModule { }