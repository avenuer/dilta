import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { schoolFeature, SchoolStore } from '@dilta/client-shared';
import { TransportService } from '@dilta/electron-client';
import { EntityNames, ModelOperations, Student } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { format } from 'date-fns';
import { SnotifyService } from 'ng-snotify';
import { Observable } from 'rxjs';
import { exhaustMap, first, map } from 'rxjs/operators';

@Component({
  selector: 'admin-ui-student-bio-form-editor',
  templateUrl: './student-bio-form-editor.component.html',
  styleUrls: ['./student-bio-form-editor.component.scss']
})
export class StudentBioFormEditorComponent implements OnInit {
  student$: Observable<Student>;

  constructor(
    private store: Store<any>,
    private transport: TransportService,
    private avr: ActivatedRoute,
    private router: Router,
    private snotify: SnotifyService
  ) {}

  displayError({ name, message }: Error) {
    this.snotify.error(message, name);
  }

  /**
   * update or upsert the student
   *
   * @param {Student} $event
   * @memberof StudentBioFormEditorComponent
   */
  upsertStudent($event: Student) {
    $event.dob = Number(format($event.dob, 'x'));
    this.store
      .select(schoolFeature)
      .pipe(
        exhaustMap(
          sch =>
            $event.id
              ? this.updateStudent($event)
              : this.createStudent(sch, $event)
        ),
        first()
      )
      .subscribe(this.changeRoute.bind(this), this.displayError.bind(this));
  }

  /**
   * update the student
   *
   * @param {Student} $event
   * @returns
   * @memberof StudentBioFormEditorComponent
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
   * @param {SchoolStore} sch
   * @param {Student} $event
   * @returns
   * @memberof StudentBioFormEditorComponent
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
    this.snotify.success(`student details successfully saved`);
    this.router.navigate(['academics', 'students']);
  }

  /**
   * retrieve student data
   *
   * @returns
   * @memberof StudentBioFormEditorComponent
   */
  retrieveStudent() {
    return this.avr.params.pipe(
      map(param => (param as any).id || ''),
      exhaustMap(id => {
        return this.transport.modelAction(
          EntityNames.Student,
          ModelOperations.Retrieve,
          id
        );
      })
    );
  }

  ngOnInit() {
    this.student$ = this.retrieveStudent();
  }
}
