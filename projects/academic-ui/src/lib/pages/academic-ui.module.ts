import { AcademicHomeComponent } from './academic-home/academic-home.component';
import { AcademicRecordPageComponent } from './academic-record-page/academic-record-page.component';
import { AcademicReportCardPageComponent } from './academic-report-card-page/academic-report-card-page.component';
import { AcademicReportPageComponent } from './academic-report-page/academic-report-page.component';
import { AcademicRoutingModule } from './academic-ui.routing';
import { LevelStaticDetailsPageComponent } from './level-static-details-page/level-static-details-page.component';
import { LevelsStudentComponent } from './levels-student/levels-student.component';
import { RecordGridPageComponent } from './record-grid-page/record-grid-page.component';
import { StudentGridPageComponent } from './student-grid-page/student-grid-page.component';
import { SubjectGridPageComponent } from './subject-grid-page/subject-grid-page.component';
import { UsersHomeDashboardComponent } from './users-home-dashboard/users-home-dashboard.component';
import { AcademicSharedUiModule } from '../components/academic-shared.module';
import { AcademicRouterDirection } from '../services/academic-router-direction';
import { AcademicService } from '../services/academic.service';
import { NgModule } from '@angular/core';
import { StudentPageModule, UserPageModule } from '@dilta/admin-uis';
import { AuthenticationFeatureModule } from '@dilta/client-auth';
import { MaterialModule, RouterDirection, SchoolFeatureNgrxModule } from '@dilta/client-shared';
import { ElectronTransportModule } from '@dilta/electron-client';
import { ProcessNgrxModule } from 'projects/setup/src/app/process/process.module';
import {
  MatMenuModule
  } from '@angular/material';



@NgModule({
  imports: [
      MaterialModule,
      MatMenuModule,
    AcademicSharedUiModule,
    AcademicRoutingModule,
    ElectronTransportModule,
    StudentPageModule,
    SchoolFeatureNgrxModule,
    ProcessNgrxModule,
    AuthenticationFeatureModule,
    UserPageModule
  ],
  declarations: [
    AcademicHomeComponent,
    StudentGridPageComponent,
    RecordGridPageComponent,
    AcademicRecordPageComponent,
    UsersHomeDashboardComponent,
    SubjectGridPageComponent,
    AcademicReportPageComponent,
    AcademicReportCardPageComponent,
    LevelsStudentComponent,
    LevelStaticDetailsPageComponent
  ],
  exports: [AcademicSharedUiModule],
  providers: [AcademicService, { provide: RouterDirection, useClass: AcademicRouterDirection }],
})
export class AcademicPageModule {}
