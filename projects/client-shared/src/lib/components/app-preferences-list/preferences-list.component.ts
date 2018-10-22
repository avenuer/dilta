import { Component } from '@angular/core';
import { ReactivePreferenceListBase } from '@dilta/common-ui/src';

@Component({
  selector: 'app-preferences-list',
  templateUrl: './preferences-list.component.html',
  styleUrls: ['./preferences-list.component.scss']
})
export class PreferencesFormListComponent extends ReactivePreferenceListBase {
  constructor() {
    super();
  }
}
