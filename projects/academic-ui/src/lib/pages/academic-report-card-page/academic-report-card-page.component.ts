import { Component, OnInit } from '@angular/core';
import { AcademicService } from '../../services/academic.service';
import { ActivatedRoute } from '@angular/router';
import { StudentSheet, StudentReportSheet } from '@dilta/shared';
import { exhaustMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'acada-academic-report-card-page',
  templateUrl: './academic-report-card-page.component.html',
  styleUrls: ['./academic-report-card-page.component.scss']
})
export class AcademicReportCardPageComponent implements OnInit {
  public reportSheet$: Observable<StudentReportSheet>;

  constructor(private avr: ActivatedRoute, private acada: AcademicService) {}

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
  }
}
