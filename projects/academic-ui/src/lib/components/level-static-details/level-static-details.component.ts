import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ClassDetailedStat, LevelStaticDetailsGridConfig } from '@dilta/shared';

@Component({
  selector: 'acada-level-static-details',
  templateUrl: './level-static-details.component.html',
  styleUrls: ['./level-static-details.component.scss']
})
export class LevelStaticDetailsComponent implements OnInit {

  @Input() stats: ClassDetailedStat[] = [];
  @Output() level = new EventEmitter();

  public keys = LevelStaticDetailsGridConfig;

  constructor() { }

  get data() {
    const stats = (this.stats) ? this.stats : [];
    return stats.sort((cur, nx) => cur.value - nx.value).map((stat, no) => Object.assign({}, stat, { no: no + 1 }));
  }

  ngOnInit() {
  }

}
