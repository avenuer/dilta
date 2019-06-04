import { AcademicService } from '../../services/academic.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ClientUtilService, PrinterService } from '@dilta/client-shared';
import {
  FindQueryParam,
  GridConfig,
  Record,
  SearchFindRequest,
  Student,
  schoolClassValueToKey,
  schoolTermValueToKey,
  RecordGridConfig,
  DateFormat
} from '@dilta/shared';
import { format } from 'date-fns';

@Component({
  selector: 'acada-record-grid-page',
  templateUrl: './record-grid-page.component.html',
  styleUrls: ['./record-grid-page.component.scss']
})
export class RecordGridPageComponent implements OnInit {
  public records: Record[] = [];

  public config: GridConfig = {
    filter: true,
    paginator: {
      length: 0,
      count: 0,
      options: [10]
    }
  };

  private _params = { limit: 10, skip: 0, sort: 'id' };

  private queryObj: SearchFindRequest<Student> = {} as any;

  constructor(
    public acada: AcademicService,
    public util: ClientUtilService,
    private printer: PrinterService
  ) {}

  search(query: SearchFindRequest<Student>) {
    this.acada.findRecords(query, this._params).subscribe(
      res => {
        this.records = res.data;
        this.config.paginator.count = res.limit;
        this.config.paginator.length = res.total;
      },
      err => this.util.error(err)
    );
  }

  paginator($event: PageEvent) {
    this._params.skip = this._params.limit * $event.pageIndex;
    this.search(this.queryObj);
  }

  query(query: SearchFindRequest<Student>) {
    this.queryObj = query === '' ? query : {};
    return this.search(this.queryObj);
  }

  print() {
    this.acada
      .findRecords(this.queryObj, {
        limit: this.config.paginator.length,
        skip: 0,
        sort: 'name'
      })
      .subscribe(
        ({ data }) => {
          this.printer.printTable(RecordGridConfig, data, {
            filename: `subject records ${format(Date.now(), DateFormat)}`
          });
        },
        err => this.util.error(err)
      );
  }

  ngOnInit() {
    this.query({});
  }
}
