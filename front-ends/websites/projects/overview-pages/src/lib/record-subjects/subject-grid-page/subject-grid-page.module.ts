import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientSharedModule, MaterialModule } from 'client-shared';

import { SubjectGridPageComponent } from './subject-grid-page.component';
import { AcademicService } from '../../academic.service';
import { DyanmicDatagridModule } from 'dynamic-grid';


@NgModule({
  imports: [
    RouterModule,
    DyanmicDatagridModule,
    MaterialModule,
    ClientSharedModule
  ],
  exports: [RouterModule],
  declarations: [SubjectGridPageComponent],
  providers: [AcademicService]
})
export class SubjectGridPageModule {}
