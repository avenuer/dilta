import { Component, OnInit } from '@angular/core';
import {
  EntityNames,
  ModelOperations,
  Student,
  schoolClassValueToKey
} from '@dilta/shared';
import { exhaustMap, first, map } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { format } from 'date-fns';
import { RouterDirection, ClientUtilService } from 'client-shared';
import { AbstractTransportService } from 'transport';

const failedStudentDeleteError = new Error(
  'error while deleting the student details'
);

@Component({
  selector: 'admin-ui-student-bio-profile',
  templateUrl: './student-bio-profile.component.html',
  styleUrls: ['./student-bio-profile.component.scss']
})
export class StudentBioProfileComponent implements OnInit {
  /** StudentBiodata */
  public StudentBio$: Observable<Student>;

  constructor(
    private store: Store<any>,
    private actr: ActivatedRoute,
    private route: RouterDirection,
    private transport: AbstractTransportService,
    private util: ClientUtilService
  ) {}

  editStudent() {
    this.StudentBio$.pipe(first()).subscribe(student =>
      this.route.editStudent(student)
    );
  }

  viewParent() {
    this.StudentBio$.pipe(first()).subscribe(student =>
      this.route.viewParent(student.parentPhone as string)
    );
  }

  deleteStudent() {
    this.actr.params
      .pipe(
        exhaustMap(params =>
          this.transport.modelAction<boolean>(
            EntityNames.Student,
            ModelOperations.Delete,
            params.id
          )
        ),
        first(),
        map(res => {
          if (res) {
            return res;
          }
          throw failedStudentDeleteError;
        })
      )
      .subscribe(
        res => {
          this.util.success(
            'Student Details',
            'successfully deleted student details'
          );
          this.deleteStudent();
        },
        err => this.util.error(err)
      );
  }

  /** gets the Student biodata */
  getBiodata(): Observable<Student> {
    return this.actr.params.pipe(
      exhaustMap(({ id }) =>
        this.transport.modelAction<Student>(
          EntityNames.Student,
          ModelOperations.Retrieve,
          {
            id
          }
        )
      ),
      map(student =>
        Object.assign(student, {
          dob: format(student.dob, 'YYYY-MM-DD'),
          class: schoolClassValueToKey(student.class)
        })
      )
    );
  }

  ngOnInit() {
    this.StudentBio$ = this.getBiodata();
  }
}
