import { AcademicService } from '../../services/academic.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridConfig, Record, Student, schoolTermValueToKey, schoolValueToKey } from '@dilta/shared';

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

  constructor(public router: Router, public acada: AcademicService) { }

  loadRecords(query) {
    this.acada.findRecords(query, this._params).subscribe(res => {
      this.records = res.data;
    });
  }

  loadStudents(query) {
    this.acada.findStudents(query, this._params).subscribe(res => {
      this.students = res.data;
    });
  }

  ngOnInit() {
    this.loadRecords({});
    this.loadStudents({});
  }

}
