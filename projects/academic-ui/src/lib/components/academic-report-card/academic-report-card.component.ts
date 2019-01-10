import { Component, Input, OnInit } from '@angular/core';
import {
  School,
  schoolTermValueToKey,
  schoolClassValueToKey,
  StudentReportSheet
  } from '@dilta/shared';
import { format } from 'date-fns';

@Component({
  selector: 'acada-academic-report-card',
  templateUrl: './academic-report-card.component.html',
  styleUrls: ['./academic-report-card.component.scss']
})
export class AcademicReportCardComponent implements OnInit {

  @Input() reportSheet: StudentReportSheet;
  @Input() school: School;

  public levelName = schoolClassValueToKey;
  public termName = schoolTermValueToKey;

  constructor() { }

  formatDob(date: number) {
    return format(date, 'DD-MMM-YYYY');
  }

  ngOnInit() {
  }

}
