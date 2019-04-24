import { Component, OnInit, Input,  OnChanges } from '@angular/core';
import {
  TermPreset,
  RecordSheet,
  KeysConfig,
  AcademicReportCardGridConfig,
  updateReportKeys,
  fixDuplicateKeys
} from '@dilta/shared';

@Component({
  selector: 'acada-academic-report-card-grid',
  templateUrl: './academic-report-card-grid.component.html',
  styleUrls: ['./academic-report-card-grid.component.scss']
})
export class AcademicReportCardGridComponent implements OnInit, OnChanges {
  @Input()
  scoreSheet: RecordSheet[];

  @Input() term: TermPreset;

  @Input() keys: KeysConfig[] = [];

  public alreadySet = false;

  constructor() {}

  get data() {
    const scores = this.scoreSheet ? this.scoreSheet : [];
    return scores.map((score, no) => Object.assign({}, score, { no: no + 1 }));
  }

  ngOnInit() {
    // this.keys = updateReportKeys(this.term, this.keys);
  }

  ngOnChanges() {
    // Hack: fix duplicate
    if (this.term && !this.alreadySet && (this.keys.length < 13)) {
      this.keys = updateReportKeys(this.term, [...AcademicReportCardGridConfig]);
      this.alreadySet = true;
    }
  }
}
