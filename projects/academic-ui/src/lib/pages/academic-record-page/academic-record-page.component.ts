import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { schoolFeature } from '@dilta/client-shared';
import { TransportService } from '@dilta/electron-client';
import { EntityNames, ModelOperations, Record } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { AuthFeature } from 'projects/auth/src/lib/ngrx';
import {
  combineLatest,
  exhaustMap,
  first,
  map
  } from 'rxjs/operators';

@Component({
  selector: 'acada-academic-record-page',
  templateUrl: './academic-record-page.component.html',
  styleUrls: ['./academic-record-page.component.scss']
})
export class AcademicRecordPageComponent implements OnInit {
  constructor(
    private transport: TransportService,
    private router: Router,
    private store: Store<any>
  ) {}

  /**
   * loads the teachers academic records
   *
   * @param {Record} record
   * @memberof AcademicRecordPageComponent
   */
  load(record: Record) {
    this.store
      .select(schoolFeature)
      .pipe(combineLatest(this.store.select(AuthFeature)))
      .pipe(
        exhaustMap(([school, auth]) => {
          record = {
            ...record,
            teacherId: auth.details.id,
            school: school.details.id
          };
          return this.transport
            .modelAction<Record>(
              EntityNames.Record,
              ModelOperations.Retrieve,
              record
            )
            .pipe(first());
        })
      )
      .pipe(
        map(val => {
          if (!val) {
            throw noRecordError;
          }
          return val;
        })
      )
      .subscribe(val => this.changeRoute(val));
  }

  /**
   * create the teachers academic records
   *
   * @param {Record} rec
   * @memberof AcademicRecordPageComponent
   */
  create(rec: Record) {
    this.store
      .select(schoolFeature)
      .pipe(combineLatest(this.store.select(AuthFeature)))
      .pipe(
        exhaustMap(([school, auth]) => {
          rec = {
            ...rec,
            teacherId: auth.details.id,
            school: school.details.id
          };
          return this.transport.modelAction<Record>(
            EntityNames.Record,
            ModelOperations.Create,
            rec
          );
        })
      )
      .pipe(first())
      .subscribe(val => this.changeRoute(val));
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
