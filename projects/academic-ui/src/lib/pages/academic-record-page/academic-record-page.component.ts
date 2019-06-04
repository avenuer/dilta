import { AcademicService } from '../../services/academic.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientUtilService } from '@dilta/client-shared';
import { AbstractTransportService } from '@dilta/electron-client';
import { EntityNames, ModelOperations, Record } from '@dilta/shared';
import { exhaustMap, first, map } from 'rxjs/operators';

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
   * @param {Record} record
   * @memberof AcademicRecordPageComponent
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
   * @param {Record} rec
   * @memberof AcademicRecordPageComponent
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
   * @param {Record} rec
   * @returns
   * @memberof AcademicRecordPageComponent
   */
  changeRoute(rec: Record) {
    this.router.navigate(['academics', 'subjects', rec.id]);
  }

  ngOnInit() {}
}

const noRecordError = new Error('No Record Found');
