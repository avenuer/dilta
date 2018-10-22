import { Component, ViewEncapsulation } from '@angular/core';
import { ReactivePreferenceBase } from '@dilta/common-ui/src';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './app-preferences-form.component.html',
  styleUrls: ['./app-preferences-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreferencesFormComponent extends ReactivePreferenceBase {
  constructor() {
    super();
  }
}
