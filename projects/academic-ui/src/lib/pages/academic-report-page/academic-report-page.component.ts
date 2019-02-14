import { AcademicService } from '../../services/academic.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import {
  ClientUtilService,
} from '@dilta/client-shared';
import {
  GridConfig,
  SearchFindRequest,
  Student,
  StudentSheet
} from '@dilta/shared';


@Component({
  selector: 'acada-academic-report-page',
  templateUrl: './academic-report-page.component.html',
  styleUrls: ['./academic-report-page.component.scss']
})
export class AcademicReportPageComponent implements OnInit {
  /**
   * displays form and hides the student table
   *
   * @memberof AcademicReportPageComponent
   */
  public showFormAndHideTable = true;

  /**
   * array holding the student list
   *
   * @type {Student[]}
   * @memberof AcademicReportPageComponent
   */
  public students: Student[] = [];

  /**
   * Table config
   *
   * @type {GridConfig}
   * @memberof AcademicReportPageComponent
   */
  public config: GridConfig = {
    filter: true,
    paginator: {
      length: 0,
      count: 0,
      options: [10]
    }
  };

  /**
   * pagination settings
   *
   * @private
   * @memberof AcademicReportPageComponent
   */
  private _params = { limit: 10, skip: 0, sort: 'name' };

  /**
   * Query for search
   *
   * @private
   * @type {SearchFindRequest<Student>}
   * @memberof AcademicReportPageComponent
   */
  private queryObj: SearchFindRequest<Student>;

  /**
   * query object for requesting the report sheet
   *
   * @private
   * @type {Partial<StudentSheet>}
   * @memberof AcademicReportPageComponent
   */
  private reportSheetTerms: Partial<StudentSheet>;

  /**
   *Creates an instance of AcademicReportPageComponent.
   * @param {AcademicService} acada
   * @memberof AcademicReportPageComponent
   */
  constructor(
    private acada: AcademicService,
    private router: Router,
    public util: ClientUtilService
  ) {}

  /**
   * listens for the report sheet
   *
   * @param {Partial<StudentSheet>} reportTerms
   * @memberof AcademicReportPageComponent
   */
  reportSheetConfig(reportTerms: Partial<StudentSheet>) {
    this.students = [];
    this.reportSheetTerms = reportTerms;
    this.retrieveStudents({ class: reportTerms.level });
  }

  studentReport(student: Student) {
    this.reportSheetTerms.studentId = student.id;
    const { level, studentId, session, term } = this.reportSheetTerms;
    this.router.navigate([
      'academics',
      'score-sheet',
      session,
      term,
      level,
      studentId
    ]);
  }

  /**
   * retieves the student from the class
   *
   * @param {SearchFindRequest<Student>} query
   * @memberof AcademicReportPageComponent
   */
  retrieveStudents(query: SearchFindRequest<Student>) {
    this.acada.findStudents(query, this._params).subscribe(
      res => {
        this.students = res.data;
        this.config.paginator.count = res.limit;
        this.config.paginator.length = res.total;
        this.showFormAndHideTable = false;
      },
      err => this.util.error(err)
    );
  }

  searchStudents(query: SearchFindRequest<Student>) {
    this.queryObj =
      query !== '' ? query : { class: this.reportSheetTerms.level };
    return this.retrieveStudents(this.queryObj);
  }

  paginator($event: PageEvent) {
    this._params.skip = this._params.limit * $event.pageIndex;
    this.retrieveStudents(this.queryObj);
  }

  ngOnInit() {}
}
