import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { AcademicSettingRoutingModule } from './academic-setting-routing.module';
import { AcademicRecordConfigComponent } from './academic-record-config/academic-record-config.component';
import { AcademicGradingConfigComponent } from './academic-grading-config/academic-grading-config.component';
import { AcademicSettingComponent } from './academic-setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material';

@NgModule({
  declarations: [
    AcademicRecordConfigComponent,
    AcademicGradingConfigComponent,
    AcademicSettingComponent
  ],
  imports: [MaterialModule, ReactiveFormsModule, AcademicSettingRoutingModule, MatStepperModule]
})
export class AcademicSettingModule {}
