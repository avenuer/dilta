import { AcademicHomeComponent } from './academic-home/academic-home.component';
import { AcademicRecordPageComponent } from './academic-record-page/academic-record-page.component';
import { AcademicRoutingModule } from './academic-ui.routing';
import { RecordGridPageComponent } from './record-grid-page/record-grid-page.component';
import { StudentGridPageComponent } from './student-grid-page/student-grid-page.component';
import { SubjectGridPageComponent } from './subject-grid-page/subject-grid-page.component';
import { UsersHomeDashboardComponent } from './users-home-dashboard/users-home-dashboard.component';
import { AcademicSharedUiModule } from '../components/academic-shared.module';
import { AcademicService } from '../services/academic.service';
import { NgModule } from '@angular/core';
import { StudentPageModule } from '@dilta/admin-uis';
import { AuthenticationFeatureModule } from '@dilta/client-auth';
import { MaterialModule, SchoolFeatureNgrxModule } from '@dilta/client-shared';
import { ElectronTransportModule } from '@dilta/electron-client';
import { ProcessNgrxModule } from 'projects/setup/src/app/process/process.module';
import { AcademicReportPageComponent } from './academic-report-page/academic-report-page.component';
import { AcademicReportCardPageComponent } from './academic-report-card-page/academic-report-card-page.component';

@NgModule({
  imports: [
    MaterialModule,
    AcademicSharedUiModule,
    AcademicRoutingModule,
    ElectronTransportModule,
    StudentPageModule,
    SchoolFeatureNgrxModule,
    ProcessNgrxModule,
    AuthenticationFeatureModule,
  ],
  declarations: [
    AcademicHomeComponent,
    StudentGridPageComponent,
    RecordGridPageComponent,
    AcademicRecordPageComponent,
    UsersHomeDashboardComponent,
    SubjectGridPageComponent,
    AcademicReportPageComponent,
    AcademicReportCardPageComponent
  ],
  exports: [AcademicSharedUiModule],
  providers: [AcademicService],
})
export class AcademicPageModule {}
