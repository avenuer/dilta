import { AcademicService } from '../../services/academic.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientUtilService } from '@dilta/client-shared';
import { StudentReportSheet, StudentSheet } from '@dilta/shared';
import { schoolTermValueToKey, schoolValueToKey } from '@dilta/shared';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { exhaustMap, first, map } from 'rxjs/operators';


@Component({
  selector: 'acada-academic-report-card-page',
  templateUrl: './academic-report-card-page.component.html',
  styleUrls: ['./academic-report-card-page.component.scss']
})
export class AcademicReportCardPageComponent implements OnInit {
  public reportSheet$: Observable<StudentReportSheet>;

  public levelName = schoolValueToKey;
  public termName = schoolTermValueToKey;

  constructor(private avr: ActivatedRoute, private acada: AcademicService, private util: ClientUtilService) {}

  formatDob(date: number) {
    return format(date, 'DD-MMM-YYYY');
  }

  /**
   * Cleans the arguments from string to Numbers
   *
   * @param {StudentSheet} { level, session, studentId, term }
   * @returns {StudentSheet}
   * @memberof ScoreSheet
   */
  cleanSheet({ level, session, studentId, term }: StudentSheet): StudentSheet {
    return {
      session,
      studentId,
      level: Number(level),
      term: Number(term)
    } as any;
  }


  /**
   * retrieves the student report card
   *
   * @returns
   * @memberof AcademicReportCardPageComponent
   */
  retrieveReportSheet() {
    return this.avr.params
      .pipe(map((param: StudentSheet) => this.cleanSheet(param)))
      .pipe(
        exhaustMap((sheet: StudentSheet) =>
          this.acada.studentReportSheet(sheet)
        )
      );
  }

  ngOnInit() {
    this.reportSheet$ = this.retrieveReportSheet();
    this.reportSheet$.pipe(first()).subscribe({ error: (err) => this.util.error(err) });
  }
}
