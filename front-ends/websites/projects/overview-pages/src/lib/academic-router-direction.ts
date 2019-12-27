import { ActivatedRoute, Router } from '@angular/router';
import { Auth, Manager, Parent, School, Student, User } from '@dilta/shared';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterDirection, Authsuccess, RouterState } from 'client-shared';

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
    this.viewUserDetails(user);
    // this.store.dispatch(new AuthLogOut());
    // this.router.navigate(['']);
  }

  /**
   * the route to load when user  authentication succesfully signup or edited
   *
   * @param {Auth} auth
   * @memberof RouterDirection
   */
  signupForm(auth: Auth) {
    this.router.navigate(['academics', 'admins', auth.id]);
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
    this.viewParent(parent);
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
    this.router.navigate(['academics', 'admins', user.authId]);
  }

  deletedStudent() {
    this.router.navigate(['academics', 'student']);
  }

  deletedUser() {
    this.router.navigate(['academics', 'admins']);
  }

  /**
   * route direction to create a new parent
   *
   * @param {string} parentPhoneNo
   * @memberof RouterDirection
   */
  createParent(parentPhoneNo: string) {
    this.router.navigate(['academics', 'parents', parentPhoneNo]);
  }

  /**
   * route direction to edit parent
   *
   * @param {Parent} parent
   * @memberof RouterDirection
   */
  editParent(parent: Parent) {
    this.createParent(parent.phoneNo as string);
  }

  /**
   * route direction to view parent details
   *
   * @param {Parent} parent
   * @memberof RouterDirection
   */
  viewParent(parent: Parent | string) {
    this.router.navigate([
      'academics',
      'parent',
      typeof parent === 'object' ? parent.phoneNo : parent
    ]);
  }

  deletedRecord() {
    this.router.navigate(['academics']);
  }
}
