import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientSharedModule, MaterialModule } from 'client-shared';
import { StudentGridModule } from '../student-grid/student-grid.module';
import { AcademicService } from '../../academic.service';
import { StudentGridPageComponent } from "./student-grid-page.component";

@NgModule({
  imports: [
    RouterModule,
    StudentGridModule,
    ClientSharedModule,
    MaterialModule
  ],
  exports: [StudentGridPageComponent],
  providers: [AcademicService],
  declarations: [StudentGridPageComponent]
})
export class StudentGridPageModule {}
