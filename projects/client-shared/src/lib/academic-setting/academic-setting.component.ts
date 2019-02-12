import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AcademicSetting, EntityNames, ModelOperations } from '@dilta/shared';
import { RouterDirection } from '../services/direction.service';
import { Store } from '@ngrx/store';
import { TransportService } from '@dilta/electron-client';
import { schoolFeature } from '../ngrx/school';
import { exhaustMap, map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClientUtilService } from '../services/util.service';
import { MatHorizontalStepper } from '@angular/material';

@Component({
  selector: 'shared-academic-setting',
  templateUrl: './academic-setting.component.html',
  styleUrls: ['./academic-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicSettingComponent implements OnInit {
  private academic: AcademicSetting = {} as any;

  public setting$: Observable<AcademicSetting>;

  constructor(
    private store: Store<any>,
    private dir: RouterDirection,
    private transport: TransportService,
    private util: ClientUtilService
  ) {}


  /**
   * changes the step to the next and calls configure
   *
   * @param {MatHorizontalStepper} stepper
   * @returns
   * @memberof AcademicSettingComponent
   */
  stepAndConfigure(stepper: MatHorizontalStepper) {
    stepper.next();
    return this.configure.bind(this);
  }


  /**
   * sets the key property on the setting, validates it and upload it
   *
   * @param {string} key
   * @param {*} value
   * @memberof AcademicSettingComponent
   */
  configure(key: string, value: any) {
    this.academic[key] = value;
    if (this.academic.record && this.academic.grade) {
      console.clear();
      console.log(JSON.stringify(this.academic));
      this.upload(this.academic).pipe(first())
        .subscribe((val) => this.dir.academicSettingForm(val), (err) => this.util.error(err));
    }
  }


  /**
   * checks whether to upload or create the setting
   *
   * @param {AcademicSetting} setting
   * @returns
   * @memberof AcademicSettingComponent
   */
  upload(setting: AcademicSetting) {
    return setting.id ? this.updateSettings(setting) : this.createSettings(setting);
  }


  /**
   * retrieve the existing setting for the school
   *
   * @returns
   * @memberof AcademicSettingComponent
   */
  retrieveSettings() {
    return this.store
      .select(schoolFeature)
      .pipe(
        map(feature => feature.details),
        exhaustMap(({ id }) =>
          this.transport.modelAction<AcademicSetting>(
            EntityNames.academic_setting,
            ModelOperations.Retrieve,
            { school: id } as Partial<AcademicSetting>
          )
        )
      );
  }

  /**
   * create a new setting for the school
   *
   * @param {AcademicSetting} setting
   * @returns
   * @memberof AcademicSettingComponent
   */
  createSettings(setting: AcademicSetting) {
    return this.store
      .select(schoolFeature)
      .pipe(
        map(feature => feature.details),
        exhaustMap(({ id }) =>
          this.transport.modelAction<AcademicSetting>(
            EntityNames.academic_setting,
            ModelOperations.Create,
            { ...setting, school: id } as Partial<AcademicSetting>
          )
        )
      );
  }

  /**
   * updates the settings
   *
   * @param {AcademicSetting} setting
   * @returns
   * @memberof AcademicSettingComponent
   */
  updateSettings(setting: AcademicSetting) {
    return this.transport.modelAction<AcademicSetting>(
      EntityNames.academic_setting,
      ModelOperations.Update,
      setting.id, setting
    );
  }

  ngOnInit() {
    this.setting$ = this.retrieveSettings();
  }
}
