import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material';
import { MaterialModule } from 'client-shared';
import { AcademicSettingComponent } from './academic-setting.component';

import { AcademicGradingConfigModule } from '../academic-grading-config/academic-grading-config.module';
import { AcademicRecordConfigModule } from '../academic-record-config/academic-record-config.module';

@NgModule({
  declarations: [AcademicSettingComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    MatStepperModule,
    AcademicGradingConfigModule,
    AcademicRecordConfigModule
  ]
})
export class AcademicSettingModule {}
