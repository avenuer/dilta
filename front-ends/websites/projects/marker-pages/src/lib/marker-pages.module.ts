import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AcademicHomeComponent } from './academic-home/academic-home.component';
import { AcademicToolBarComponent } from './academic-tool-bar/academic-tool-bar.component';
import { MaterialModule, ClientSharedModule } from 'client-shared';

@NgModule({
  declarations: [AcademicHomeComponent, AcademicToolBarComponent],
  imports: [MaterialModule, ClientSharedModule, RouterModule],
  exports: [AcademicHomeComponent, AcademicToolBarComponent]
})
export class MarkerPagesModule {}
