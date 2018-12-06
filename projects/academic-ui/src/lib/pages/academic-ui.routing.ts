import { AcademicHomeComponent } from './academic-home/academic-home.component';
import { AcademicRecordPageComponent } from './academic-record-page/academic-record-page.component';
import { AcademicReportCardPageComponent } from './academic-report-card-page/academic-report-card-page.component';
import { AcademicReportPageComponent } from './academic-report-page/academic-report-page.component';
import { LevelStaticDetailsPageComponent } from './level-static-details-page/level-static-details-page.component';
import { LevelsStudentComponent } from './levels-student/levels-student.component';
import { RecordGridPageComponent } from './record-grid-page/record-grid-page.component';
import { StudentGridPageComponent } from './student-grid-page/student-grid-page.component';
import { SubjectGridPageComponent } from './subject-grid-page/subject-grid-page.component';
import { UsersHomeDashboardComponent } from './users-home-dashboard/users-home-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGridPageComponent } from 'projects/admin-uis/src/lib/pages/admin-grid-page/admin-grid-page.component';
import { StudentBioFormEditorComponent } from 'projects/admin-uis/src/lib/pages/student-bio-form-editor/student-bio-form-editor.component';
import { StudentBioProfileComponent } from 'projects/admin-uis/src/lib/pages/student-bio-profile/student-bio-profile.component';
import { UserBioDataFormPageComponent } from 'projects/admin-uis/src/lib/pages/user-biodata-setup/admin-biodata.component';

const routes: Routes = [
  {
    path: 'academics',
    component: AcademicHomeComponent,
    children: [
      {
        path: '',
        component: UsersHomeDashboardComponent
      },
      {
        path: 'students',
        component: StudentGridPageComponent
      },
      { path: 'reports', component: AcademicReportPageComponent },
      { path: 'record', component: AcademicRecordPageComponent },
      { path: 'records', component: RecordGridPageComponent },
      { path: 'student', component: StudentBioFormEditorComponent },
      { path: 'students/:id', component: StudentBioProfileComponent },
      { path: 'subjects/:id', component: SubjectGridPageComponent },
      {
        path: 'score-sheet/:session/:term/:level/:studentId',
        component: AcademicReportCardPageComponent
      },
      {
        path: 'levels',
        component: LevelStaticDetailsPageComponent
      },
      {
        path: 'levels/:id',
        component: LevelsStudentComponent
      },
      {
        path: 'admins',
        component: AdminGridPageComponent
      },
      {
        path: 'admins/:authId',
        component: UserBioDataFormPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicRoutingModule {}
