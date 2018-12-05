import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { KeysConfig } from '../dynamic-datagrid/dynamic-datagrid.component';
import { ClassDetailedStat } from '@dilta/shared';

@Component({
  selector: 'acada-level-static-details',
  templateUrl: './level-static-details.component.html',
  styleUrls: ['./level-static-details.component.scss']
})
export class LevelStaticDetailsComponent implements OnInit {

  @Input() stats: ClassDetailedStat[] = [];
  @Output() level = new EventEmitter();

  public keys: KeysConfig[] = [
    { key: 'no', title: 'N/O', type: 'number', editable: false, send: true },
    { key: 'name', title: 'Class', type: 'string', editable: false, send: true  },
    { key: 'male', title: 'Male', type: 'number', editable: false, send: true  },
    { key: 'female', title: 'Female', type: 'number', editable: false, send: true  },
    { key: 'total', title: 'Total', type: 'number', editable: false, send: true  },
  ];

  constructor() { }

  get data() {
    const stats = (this.stats) ? this.stats : [];
    return stats.sort((cur, nx) => cur.value - nx.value).map((stat, no) => Object.assign({}, stat, { no: no + 1 }));
  }

  ngOnInit() {
  }

}
