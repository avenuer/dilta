import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebToolBarComponent } from './web-tool-bar.component';
import { WebMaterialModule } from '../../web-material.module';

@NgModule({
    imports: [
        WebMaterialModule,
        RouterModule
    ],
    declarations: [WebToolBarComponent],
    exports: [WebToolBarComponent]
})
export class WebToolBarModule { }
