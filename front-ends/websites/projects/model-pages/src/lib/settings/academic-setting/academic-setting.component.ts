import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AcademicSetting, EntityNames, ModelOperations } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { MatHorizontalStepper } from '@angular/material';
import { RouterDirection, ClientUtilService } from 'client-shared';
import { AbstractTransportService } from 'transport';
import { schoolFeature } from 'school-pages';

import { Observable } from 'rxjs';
import { exhaustMap, map, first } from 'rxjs/operators';

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
    private transport: AbstractTransportService,
    private util: ClientUtilService
  ) {}

  /**
   * changes the step to the next and calls configure
   *
   */
  stepAndConfigure(stepper: MatHorizontalStepper, key: string, value: any) {
    stepper.next();
    this.configure(key, value);
  }

  /**
   * sets the key property on the setting, validates it and upload it
   *
   */
  configure(key: string, value: any) {
    this.academic[key] = value;
    if (this.academic.record && this.academic.grade) {
      this.setting$
        .pipe(
          map(setting => Object.assign({}, setting, this.academic)),
          exhaustMap(setting => this.upload(setting))
        )
        .pipe(first())
        .subscribe(
          val => this.dir.academicSettingForm(val),
          err => this.util.error(err)
        );
    }
  }

  /**
   * checks whether to upload or create the setting
   *
   */
  upload(setting: AcademicSetting) {
    return setting.id
      ? this.updateSettings(setting)
      : this.createSettings(setting);
  }

  /**
   * retrieve the existing setting for the school
   *
   */
  retrieveSettings() {
    return this.store.select(schoolFeature).pipe(
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
   */
  createSettings(setting: AcademicSetting) {
    return this.store.select(schoolFeature).pipe(
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
   */
  updateSettings(setting: AcademicSetting) {
    return this.transport.modelAction<AcademicSetting>(
      EntityNames.academic_setting,
      ModelOperations.Update,
      setting.id,
      setting
    );
  }

  ngOnInit() {
    this.setting$ = this.retrieveSettings();
  }
}
