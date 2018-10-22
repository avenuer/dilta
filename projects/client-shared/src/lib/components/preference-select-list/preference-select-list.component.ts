import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveSelectPreferenceListBase } from '@dilta/common-ui/src';

@Component({
  selector: 'app-preference-select-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './preference-select-list.component.html',
  styleUrls: ['./preference-select-list.component.scss']
})
export class PreferenceSelectListComponent extends ReactiveSelectPreferenceListBase
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
