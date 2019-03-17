import { Component, OnInit, Input } from '@angular/core';
import {
  TermPreset,
  RecordSheet,
  KeysConfig,
  AcademicReportCardGridConfig
} from '@dilta/shared';

@Component({
  selector: 'acada-academic-report-card-grid',
  templateUrl: './academic-report-card-grid.component.html',
  styleUrls: ['./academic-report-card-grid.component.scss']
})
export class AcademicReportCardGridComponent implements OnInit {
  @Input()
  scoreSheet: RecordSheet[];

  @Input() term: TermPreset;

  @Input() keys: KeysConfig[] = AcademicReportCardGridConfig;

  constructor() {}

  /**
   * Updates the table to configure displayed
   * tables different terms
   *
   * @param {TermPreset} term
   * @memberof AcademicReportCardGridComponent
   */
  updateKeys(term: TermPreset) {
    // this.reportSheet.scoreSheet.forEach(e => e.)
    if (term === TermPreset.Second || term === TermPreset.Third) {
      this.keys.push({
        key: 'firstTerm',
        title: '1st Term',
        type: 'number',
        editable: false
      });
    }
    if (term === TermPreset.Third) {
      this.keys.push({
        key: 'secondTerm',
        title: '2nd Term',
        type: 'number',
        editable: false
      });
    }
  }

  get data() {
    const scores = this.scoreSheet ? this.scoreSheet : [];
    return scores.map((score, no) => Object.assign({}, score, { no: no + 1 }));
  }

  ngOnInit() {
    this.updateKeys(this.term);
  }
}
