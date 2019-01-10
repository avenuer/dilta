import { AuthFeature, AuthLogin, Authsuccess, AuthLogOut } from '../../ngrx';
import { Component, OnInit } from '@angular/core';
import { ClientUtilService, RouterDirection, SchoolActionSuccess } from '@dilta/client-shared';
import { Login, School } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { map, first, withLatestFrom,  distinct, count } from 'rxjs/operators';

@Component({
  selector: 'auth-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AuthUserLoginComponent implements OnInit {

  constructor(private store: Store<any>, private dir: RouterDirection, private util: ClientUtilService) {}

  /**
   * dispath ation to login
   *
   * @param {Login} evnt
   * @memberof AuthUserLoginBase
   */
  login(evnt: Login) {
    this.store.dispatch(new AuthLogin(evnt));
    this.store
      .select(AuthFeature)
      .pipe(distinct())
      .subscribe((state) => {
        console.log({ state });
        if (state.error) {
          this.util.error(state.error);
          return;
        }
        if (state.details) {
          this.changeRoute(state);
        }
      });
  }

  /**
   * changes the route if auth is valid
   *
   * @param {Authsuccess} auth
   * @returns
   * @memberof AuthUserLoginBase
   */
  changeRoute(auth: Authsuccess) {
    console.log(auth);
    if (!auth.details) {
      return;
    }
    this.store.dispatch(new SchoolActionSuccess(auth.details.school as School));
    this.util.success('Authentication', 'user successfully login');
    this.dir.loginForm(auth);
  }

  ngOnInit() {
  }
}
