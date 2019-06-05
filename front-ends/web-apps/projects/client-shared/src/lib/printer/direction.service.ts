import { RouterState } from './router-state.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, Manager, Parent, School, Student, User, AcademicSetting } from '@dilta/shared';
import { Authsuccess } from 'projects/auth/src/lib/ngrx/auth.reducer';

/**
 * This class holds various route configurations for pages dynamically
 *
 * @export
 * @class RouterDirection
 */
@Injectable()
export class RouterDirection {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public state: RouterState
  ) {}

  /**
   * the route to load when user biodata is succesfully created or edited
   *
   * @param {User} user
   * @memberof RouterDirection
   */
  userForm(user: User) {}

  /**
   * the route to load when user  authentication succesfully signup or edited
   *
   * @param {Auth} auth
   * @memberof RouterDirection
   */
  signupForm(auth: Auth) {}

  /**
   * the route to load when user succesfully logins in
   *
   * @param {Authsuccess} auth
   * @memberof RouterDirection
   */
  loginForm(auth: Authsuccess) {}

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
    this.router.navigate(['academics', 'levels', student.class]);
  }

  /**
   * route for successfull parent form
   *
   * @param {Parent} parent
   * @memberof AcademicRouterDirection
   */
  parentForm(parent: Parent) {}

  /**
   * Route navigation for editing the student
   *
   * @param {Student} student
   * @memberof RouterDirection
   */
  editStudent(student: Student) {}

  /**
   * route direction to view student details
   *
   * @param {Student} student
   * @memberof RouterDirection
   */
  viewStudentDetails(student: Student) {}

  /**
   * route navigation after deleting the student
   *
   * @param {Student} student
   * @memberof RouterDirection
   */
  deletedStudent(student?: Student) {}

  /**
   * route navigation for editing the user
   *
   * @param {User} user
   * @memberof RouterDirection
   */
  editUser(user: User) {}

  /**
   * route navigation after deleting the user.
   *
   * @param {User} user
   * @memberof RouterDirection
   */
  deletedUser(user: User) {}

  /**
   * route direction to view user details
   *
   * @param {User} user
   * @memberof RouterDirection
   */
  viewUserDetails(user: User) {}

  /**
   * route direction to create a new parent
   *
   * @param {string} parentPhoneNo
   * @memberof RouterDirection
   */
  createParent(parentPhoneNo: string) {}

  /**
   * route direction to edit parent
   *
   * @param {Parent} parent
   * @memberof RouterDirection
   */
  editParent(parent: Parent) {}

  /**
   * route direction to view parent details
   *
   * @param {Parent} parent
   * @memberof RouterDirection
   */
  viewParent(parent: Parent | string) {}


  /**
   * route direction after deleting a subject record
   *
   * @memberof RouterDirection
   */
  deletedRecord() {}

  /**
   * route to redirect after academic setting
   *
   * @param {AcademicSetting} setting
   * @memberof RouterDirection
   */
  academicSettingForm(setting: AcademicSetting) {}
}
