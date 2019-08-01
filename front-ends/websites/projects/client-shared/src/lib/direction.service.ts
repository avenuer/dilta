import { RouterState } from './router-state.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Auth,
  Manager,
  Parent,
  School,
  Student,
  User,
  AcademicSetting
} from '@dilta/shared';
import { Authsuccess } from './interface';

/**
 * This class holds various route configurations for pages dynamically
 *
 * @export
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
   * @param user
   */
  userForm(user: User) {}

  /**
   * the route to load when user  authentication succesfully signup or edited
   *
   * @param auth
   */
  signupForm(auth: Auth) {}

  /**
   * the route to load when user succesfully logins in
   *
   * @param auth
   */
  loginForm(auth: Authsuccess) {}

  /**
   * the route to load when school biodata is succesfully created or edited
   *
   * @param school
   */
  schoolForm(school: School) {}

  /**
   * the route to load when manager's biodata is succesfully created or edited
   *
   * @param manager
   */
  managerForm(manager: Manager) {}

  /**
   * route for successfull student details.
   *
   * @param student
   */
  studentForm(student: Student) {
    this.router.navigate(['academics', 'levels', student.class]);
  }

  /**
   * route for successfull parent form
   *
   * @param parent
   */
  parentForm(parent: Parent) {}

  /**
   * Route navigation for editing the student
   *
   * @param student
   */
  editStudent(student: Student) {}

  /**
   * route direction to view student details
   *
   * @param  student
   */
  viewStudentDetails(student: Student) {}

  /**
   * route navigation after deleting the student
   *
   * @param student
   */
  deletedStudent(student?: Student) {}

  /**
   * route navigation for editing the user
   *
   * @param user
   */
  editUser(user: User) {}

  /**
   * route navigation after deleting the user.
   *
   * @param user
   */
  deletedUser(user: User) {}

  /**
   * route direction to view user details
   *
   * @param  user
   */
  viewUserDetails(user: User) {}

  /**
   * route direction to create a new parent
   *
   * @param  parentPhoneNo
   */
  createParent(parentPhoneNo: string) {}

  /**
   * route direction to edit parent
   *
   * @param parent
   */
  editParent(parent: Parent) {}

  /**
   * route direction to view parent details
   *
   * @param  parent
   */
  viewParent(parent: Parent | string) {}

  /**
   * route direction after deleting a subject record
   *
   */
  deletedRecord() {}

  /**
   * route to redirect after academic setting
   *
   * @param setting
   */
  academicSettingForm(setting: AcademicSetting) {}
}
