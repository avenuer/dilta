import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'client-shared';
import { ReactiveFormsModule } from '@angular/forms';

import { AcademicService } from '../academic.service';
import { UsersHomeDashboardComponent } from './users-home-dashboard.component';
import { RecordGridModule } from '../record-subjects/record-grid/record-grid.module';
import { StudentGridModule } from '../students-list/student-grid/student-grid.module';

const routes: Routes = [
  {
    path: '',
    component: UsersHomeDashboardComponent
  }
];

@NgModule({
  declarations: [UsersHomeDashboardComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    RecordGridModule,
    StudentGridModule,
    RouterModule.forChild(routes)
  ],
  exports: [UsersHomeDashboardComponent],
  providers: [AcademicService]
})
export class UserHomeDashboardPageModule {}
