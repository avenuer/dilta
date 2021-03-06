import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  GridConfig,
  Record,
  schoolTermValueToKey,
  schoolClassValueToKey,
  Student
  } from '@dilta/shared';
import { AcademicService } from '../academic.service';
import { ClientUtilService, RouterDirection } from 'client-shared';

@Component({
  selector: 'acada-users-home-dashboard',
  templateUrl: './users-home-dashboard.component.html',
  styleUrls: ['./users-home-dashboard.component.scss']
})
export class UsersHomeDashboardComponent implements OnInit {
  public records: Record[] = [];
  public students: Student[] = [];

  public config: GridConfig = {};
  private _params = { limit: 3, skip: 0, sort: 'id' };

  constructor(
    public router: Router,
    public acada: AcademicService,
    private util: ClientUtilService,
    public dir: RouterDirection
  ) {}

  loadRecords(query) {
    this.acada.findRecords(query, this._params).subscribe(
      res => {
        this.records = res.data;
      },
      err => this.util.error(err)
    );
  }

  loadStudents(query) {
    this.acada.findStudents(query, this._params).subscribe(
      res => {
        this.students = res.data;
      },
      err => this.util.error(err)
    );
  }

  ngOnInit() {
    this.loadRecords({});
    this.loadStudents({});
  }
}
