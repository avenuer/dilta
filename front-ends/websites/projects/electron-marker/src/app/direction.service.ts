import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterDirection, RouterState } from '@dilta/client-shared';
import {
  Auth,
  Manager,
  School,
  Student,
  User,
  AcademicSetting
  } from '@dilta/shared';

/**
 * This class holds various route configurations for pages dynamically
 *
 * @export
 * @class RouterDirection
 */
@Injectable()
export class SetupRouterDirection extends RouterDirection {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public state: RouterState
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
    this.router.navigate(['done']);
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
   * the route to load when school biodata is succesfully created or edited
   *
   * @param {School} school
   * @memberof RouterDirection
   */
  schoolForm(school: School) {
    this.router.navigate(['admin', 'manager', school.id]);
  }

  /**
   * the route to load when manager's biodata is succesfully created or edited
   *
   * @param {Manager} manager
   * @memberof RouterDirection
   */
  managerForm(manager: Manager) {
    this.router.navigate(['academic-config']);
  }


  /**
   * route for successfull student update
   *
   * @param {Student} student
   * @memberof SetupRouterDirection
   */
  studentForm(student: Student) {}

  academicSettingForm(setting: AcademicSetting) {
    this.router.navigate(['auth', 'signup']);
  }
}
