import { AcademicHomeComponent } from './academic-home/academic-home.component';
import { AcademicRecordPageComponent } from './academic-record-page/academic-record-page.component';
import { RecordGridPageComponent } from './record-grid-page/record-grid-page.component';
import { StudentGridPageComponent } from './student-grid-page/student-grid-page.component';
import { SubjectGridPageComponent } from './subject-grid-page/subject-grid-page.component';
import { UsersHomeDashboardComponent } from './users-home-dashboard/users-home-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentBioFormEditorComponent } from 'projects/admin-uis/src/lib/pages/student-bio-form-editor/student-bio-form-editor.component';
import { StudentBioProfileComponent } from 'projects/admin-uis/src/lib/pages/student-bio-profile/student-bio-profile.component';
import { AcademicReportPageComponent } from './academic-report-page/academic-report-page.component';
import { AcademicReportCardPageComponent } from './academic-report-card-page/academic-report-card-page.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicRoutingModule {}
