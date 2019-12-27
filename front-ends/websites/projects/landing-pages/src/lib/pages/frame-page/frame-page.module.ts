import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FramePageComponent } from './frame-page.component';
import { WebToolBarModule } from '../../components/web-tool-bar/web-tool-bar.module';

@NgModule({
  imports: [
    WebToolBarModule,
    RouterModule
  ],
  declarations: [FramePageComponent]
})
export class FramePageModule { }
