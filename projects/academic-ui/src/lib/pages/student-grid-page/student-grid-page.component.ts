import { AcademicService } from '../../services/academic.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ClientUtilService } from '@dilta/client-shared';
import { GridConfig, SearchFindRequest, Student } from '@dilta/shared';

@Component({
  selector: 'acada-student-grid-page',
  templateUrl: './student-grid-page.component.html',
  styleUrls: ['./student-grid-page.component.scss']
})
export class StudentGridPageComponent implements OnInit {
  public students: Student[] = [];

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

  constructor(private acada: AcademicService, public util: ClientUtilService) {}

  search(query: SearchFindRequest<Student>) {
    this.acada.findStudents(query, this._params).subscribe(res => {
      this.students = res.data;
      this.config.paginator.count = res.limit;
      this.config.paginator.length = res.total;
    }, (err) => this.util.error(err));
  }

  paginator($event: PageEvent) {
    this._params.skip = this._params.limit * $event.pageIndex;
    this.search(this.queryObj);
  }

  query(query: SearchFindRequest<Student>) {
    this.queryObj = query !== '' ? query : {};
    return this.search(this.queryObj);
  }

  ngOnInit() {
    this.search({});
    // this.acada.count(88);
  }
}
