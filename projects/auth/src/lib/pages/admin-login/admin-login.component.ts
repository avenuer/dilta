import { AuthFeature, AuthLogin, Authsuccess, AuthLogOut } from '../../ngrx';
import { Component, OnInit } from '@angular/core';
import {
  ClientUtilService,
  RouterDirection,
  SchoolActionSuccess
} from '@dilta/client-shared';
import {
  Login,
  School,
  ElectronActions,
  ElectronOperations
} from '@dilta/shared';
import { Store } from '@ngrx/store';
import { distinct, first } from 'rxjs/operators';
import { TransportService } from '@dilta/electron-client';

@Component({
  selector: 'auth-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AuthUserLoginComponent implements OnInit {
  constructor(
    private store: Store<any>,
    private dir: RouterDirection,
    private util: ClientUtilService,
    private transport: TransportService
  ) {}

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
      .subscribe(state => {
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

  resetLiensce() {
    this.transport
      .execute<ElectronOperations<string>>(ElectronActions.LiensceReset)
      .pipe(first())
      .subscribe(
        ({ data, operation }) => this.util.success(operation, data),
        err => this.util.error(err)
      );
  }

  ngOnInit() {}
}
