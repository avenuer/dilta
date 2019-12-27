import { Component, OnInit } from '@angular/core';
import {
  EntityNames,
  ModelOperations,
  Student,
  schoolClassValueToKey
} from '@dilta/shared';
import { exhaustMap, first, map, skipWhile } from 'rxjs/operators';
import { isUndefined } from 'lodash';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { format } from 'date-fns';
import { AbstractTransportService } from 'transport';
import { ClientUtilService, RouterDirection } from 'client-shared';
import { schoolFeature } from 'school-pages';
import { SchoolStore } from 'school-pages';

@Component({
  selector: 'admin-ui-student-bio-form-editor',
  templateUrl: './student-bio-form-editor.component.html',
  styleUrls: ['./student-bio-form-editor.component.scss']
})
export class StudentBioFormEditorComponent implements OnInit {
  student$: Observable<Student>;

  constructor(
    private store: Store<any>,
    private transport: AbstractTransportService,
    private avr: ActivatedRoute,
    private util: ClientUtilService,
    private dir: RouterDirection
  ) {}

  /**
   * update or upsert the student
   *
   */
  upsertStudent($event: Student) {
    $event.dob = Number(format($event.dob, 'x'));
    this.store
      .select(schoolFeature)
      .pipe(
        exhaustMap(sch =>
          $event.id
            ? this.updateStudent($event)
            : this.createStudent(sch, $event)
        ),
        first()
      )
      .subscribe(this.changeRoute.bind(this), err => this.util.error(err));
  }

  /**
   * update the student
   *
   */
  updateStudent($event: Student) {
    return this.transport.modelAction<Student>(
      EntityNames.Student,
      ModelOperations.Update,
      $event.id,
      $event
    );
  }

  /**
   * create the student
   *
   */
  createStudent(sch: SchoolStore, $event: Student) {
    $event.school = sch.details.id;
    return this.transport.modelAction<Student>(
      EntityNames.Student,
      ModelOperations.Create,
      $event
    );
  }

  changeRoute(student: Student) {
    // TODO: change to student profile instead of academic dashboard
    this.util.success('Student Form', `student details successfully saved`);
    this.dir.studentForm(student);
  }

  /**
   * retrieve student data
   *
   */
  retrieveStudent() {
    return this.avr.params.pipe(
      map(param => (param as any).id),
      skipWhile(isUndefined),
      exhaustMap(id => {
        return this.transport.modelAction<Student>(
          EntityNames.Student,
          ModelOperations.Retrieve,
          id
        );
      }),
      map(student => {
        if (student) {
          student = Object.assign(student, {
            dob: format(student.dob, 'YYYY-MM-DD'),
            class: schoolClassValueToKey(student.class)
          });
        }
        return student;
      })
    );
  }

  ngOnInit() {
    this.student$ = this.retrieveStudent();
  }
}
