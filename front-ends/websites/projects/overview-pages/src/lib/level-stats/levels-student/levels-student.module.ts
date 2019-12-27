import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule, ClientSharedModule } from 'client-shared';
import { LevelsStudentComponent } from './levels-student.component';
import { StudentGridModule } from '../../students-list/student-grid/student-grid.module';
import { AcademicService } from '../../academic.service';

@NgModule({
  imports: [
    RouterModule,
    MaterialModule,
    StudentGridModule,
    ClientSharedModule
  ],
  exports: [LevelsStudentComponent],
  declarations: [LevelsStudentComponent],
  providers: [AcademicService]
})
export class LevelsStudentModule {}
