import { AcademicService } from '../../services/academic.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ClientUtilService, PrinterService, RouterDirection } from '@dilta/client-shared';
import {
  GridConfig,
  SearchFindRequest,
  Student,
  schoolClassValueToKey,
  DateFormat,
  StudentGridConfig
} from '@dilta/shared';
import { format } from 'date-fns';

@Component({
  selector: 'acada-levels-student',
  templateUrl: './levels-student.component.html',
  styleUrls: ['./levels-student.component.scss']
})
export class LevelsStudentComponent implements OnInit {
  public students: Student[] = [];

  public config: GridConfig = {
    filter: false,
    paginator: {
      length: 0,
      count: 0,
      options: [10]
    }
  };

  private level: number;

  private _params = { limit: 10, skip: 0, sort: 'id' };

  private queryObj: SearchFindRequest<Student>;

  constructor(
    private acada: AcademicService,
    private printer: PrinterService,
    private avr: ActivatedRoute,
    public util: ClientUtilService,
    public router: RouterDirection
  ) {}

  search(query: SearchFindRequest<Student>) {
    this.acada.findStudents(query, this._params).subscribe(
      res => {
        this.students = res.data;
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

  print() {
    const level = schoolClassValueToKey(this.level);
    this.acada
      .findStudents(this.queryObj, {
        limit: this.config.paginator.length,
        sort: 'name',
        skip: 0
      })
      .subscribe(
        ({ data }) => {
          const students = data.map(student => {
            return {
              ...student,
              class: schoolClassValueToKey(student.class),
              dob: format(student.dob, DateFormat)
            };
          });
          this.printer.printTable(StudentGridConfig, students, {
            filename: `${level} students ${format(Date.now(), DateFormat)}`
          });
        },
        err => this.util.error(err)
      );
  }

  ngOnInit() {
    this.level = Number(this.avr.snapshot.params.id);
    this.queryObj = { class: this.level } as any;
    this.search(this.queryObj);
  }
}
