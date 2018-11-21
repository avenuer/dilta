import { Component, OnInit } from '@angular/core';
import { AcademicService } from '../../services/academic.service';
import {
  SearchFindRequest,
  Student,
  FindQueryParam,
  Record,
  GridConfig
} from '@dilta/shared';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private acada: AcademicService) {}

  search(query: SearchFindRequest<Student>) {
    this.acada.findRecords(query, this._params).subscribe(res => {
      this.records = res.data;
      this.config.paginator.count = res.total;
      this.config.paginator.length = res.limit;
    });
  }

  paginator($event: PageEvent) {
    this._params.skip = this._params.limit * $event.pageIndex;
    this.search(this.queryObj);
  }

  query(query: SearchFindRequest<Student>) {
      this.queryObj = query === '' ? query : {};
      return this.search(this.queryObj);
  }

  ngOnInit() {}
}
