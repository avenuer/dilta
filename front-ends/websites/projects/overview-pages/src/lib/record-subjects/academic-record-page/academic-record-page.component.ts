import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntityNames, ModelOperations, Record } from '@dilta/shared';
import { exhaustMap, first, map } from 'rxjs/operators';
import { AbstractTransportService } from 'transport';
import { ClientUtilService } from 'client-shared';
import { AcademicService } from '../../academic.service';

@Component({
  selector: 'acada-academic-record-page',
  templateUrl: './academic-record-page.component.html',
  styleUrls: ['./academic-record-page.component.scss']
})
export class AcademicRecordPageComponent implements OnInit {
  constructor(
    private transport: AbstractTransportService,
    private router: Router,
    private acada: AcademicService,
    private util: ClientUtilService
  ) {}

  /**
   * loads the teachers academic records
   *
   */
  load(record: Record) {
    this.acada
      .teacherAndSchoolId()
      .pipe(
        exhaustMap(Ids =>
          this.transport.modelAction<Record>(
            EntityNames.Record,
            ModelOperations.Retrieve,
            {
              ...record,
              ...Ids
            }
          )
        )
      )
      .pipe(
        first(),
        map(val => {
          if (!val) {
            throw noRecordError;
          }
          return val;
        })
      )
      .subscribe(val => this.changeRoute(val), (err) => this.util.error(err));
  }

  /**
   * create the teachers academic records
   *
   */
  create(rec: Record) {
    this.acada
      .teacherAndSchoolId()
      .pipe(
        exhaustMap(Ids => {
          return this.transport.modelAction<Record>(
            EntityNames.Record,
            ModelOperations.Create,
            {
              ...rec,
              ...Ids
            }
          );
        })
      )
      .pipe(first())
      .subscribe(val => this.changeRoute(val), (err) => this.util.error(err));
  }

  /**
   * changes or promot for creation of view
   *
   */
  changeRoute(rec: Record) {
    this.router.navigate(['academics', 'subjects', rec.id]);
  }

  ngOnInit() {}
}

const noRecordError = new Error('No Record Found');
