import { ActivatedRoute, Router } from '@angular/router';
import {
  Auth,
  Manager,
  Parent,
  School,
  Student,
  User
} from '@dilta/shared';
import { RouterDirection, RouterState } from '@dilta/client-shared';

import { AuthLogOut } from 'projects/auth/src/lib/ngrx';
import { Authsuccess } from 'projects/auth/src/lib/ngrx/auth.reducer';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

/**
 * This class holds various route configurations for pages dynamically
 *
 * @export
 * @class RouterDirection
 */
@Injectable()
export class AcademicRouterDirection extends RouterDirection {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public state: RouterState,
    public store: Store<any>
  ) {
    super(router, route, state);
  }

  /**
   * the route to load when user biodata is succesfully created or edited
   *
   * @param {User} user
   * @memberof RouterDirection
   */
  userForm(user: User) {
    this.store.dispatch(new AuthLogOut());
    this.router.navigate(['']);
  }

  /**
   * the route to load when user  authentication succesfully signup or edited
   *
   * @param {Auth} auth
   * @memberof RouterDirection
   */
  signupForm(auth: Auth) {
    this.router.navigate(['user', 'biodata', auth.id]);
  }

  /**
   * the route to load when user succesfully logins in
   *
   * @param {Authsuccess} auth
   * @memberof RouterDirection
   */
  loginForm(auth: Authsuccess) {
    this.router.navigate(['academics']);
  }

  /**
   * the route to load when school biodata is succesfully created or edited
   *
   * @param {School} school
   * @memberof RouterDirection
   */
  schoolForm(school: School) {}

  /**
   * the route to load when manager's biodata is succesfully created or edited
   *
   * @param {Manager} manager
   * @memberof RouterDirection
   */
  managerForm(manager: Manager) {}

  /**
   * route for successfull student details.
   *
   * @param {Student} student
   * @memberof AcademicRouterDirection
   */
  studentForm(student: Student) {
    this.viewStudentDetails(student);
  }

  /**
   * route for successfull parent form
   *
   * @param {Parent} parent
   * @memberof AcademicRouterDirection
   */
  parentForm(parent: Parent) {

  }

  viewStudentDetails(student: Student) {
    this.router.navigate(['academics', 'students', student.id]);
  }

  editStudent(student: Student) {
    this.router.navigate(['academics', 'student', student.id]);
  }

  viewUserDetails(user: User) {
    this.router.navigate(['academics', 'admin', user.id]);
  }

  editUser(user: User) {
    this.router.navigate(['academics', 'student', user.authId]);
  }

  deletedStudent() {
    this.router.navigate(['academics', 'student']);
  }

  deletedUser() {
    this.router.navigate(['academics', 'admins']);
  }
}
