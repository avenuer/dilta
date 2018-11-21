import { Component, OnInit } from '@angular/core';
import { Record, EntityNames, ModelOperations } from '@dilta/shared';
import { TransportService } from '@dilta/electron-client';
import { first, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'acada-academic-record-page',
  templateUrl: './academic-record-page.component.html',
  styleUrls: ['./academic-record-page.component.scss']
})
export class AcademicRecordPageComponent implements OnInit {
  constructor(private transport: TransportService, private router: Router) {}


  /**
   * loads the teachers academic records
   *
   * @param {Record} record
   * @memberof AcademicRecordPageComponent
   */
  load(record: Record) {
    this.transport
      .modelAction<Record>(EntityNames.Record, ModelOperations.Retrieve, record)
      .pipe(first())
      .subscribe(val => this.changeOrPromptRoute(val));
  }


  /**
   * create the teachers academic records
   *
   * @param {Record} rec
   * @memberof AcademicRecordPageComponent
   */
  create(rec: Record) {
    this.transport
      .modelAction<Record>(EntityNames.Record, ModelOperations.Create, rec)
      .pipe(first())
      .subscribe(val => this.changeOrPromptRoute(val));
  }


  /**
   * changes or promot for creation of view
   *
   * @param {Record} rec
   * @returns
   * @memberof AcademicRecordPageComponent
   */
  changeOrPromptRoute(rec: Record) {
    if (!rec) {
      return;
    }
    this.router.navigate(['academics', 'record', rec.id]);
  }

  ngOnInit() {}
}
