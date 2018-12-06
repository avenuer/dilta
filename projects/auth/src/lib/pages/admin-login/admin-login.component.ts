import { AuthFeature, AuthLogin, Authsuccess } from '../../ngrx';
import { Component, OnInit } from '@angular/core';
import { RouterDirection, SchoolActionSuccess } from '@dilta/client-shared';
import { Login, School } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { SnotifyService } from 'ng-snotify';
import { map } from 'rxjs/operators';

@Component({
  selector: 'auth-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AuthUserLoginComponent implements OnInit {

  constructor(private store: Store<any>, private dir: RouterDirection, private snotify: SnotifyService) {}

  /**
   * dispath ation to login
   *
   * @param {Login} evnt
   * @memberof AuthUserLoginBase
   */
  login(evnt: Login) {
    this.store.dispatch(new AuthLogin(evnt));
  }

  /**
   * changes the route if auth is valid
   *
   * @param {Authsuccess} auth
   * @returns
   * @memberof AuthUserLoginBase
   */
  changeRoute(auth: Authsuccess) {
    if (!auth.details) {
      return;
    }
    this.store.dispatch(new SchoolActionSuccess(auth.details.school as School));
    this.dir.loginForm(auth);
  }

  /**
   * displays the error to the child component
   *
   * @param {Error} err
   * @memberof AuthUserLoginBase
   */
  displayError({ message, name }: Error) {
    this.snotify.error(message, name);
  }

  /**
   * listens for auth feature changes
   *
   * @memberof AuthUserLoginBase
   */
  onValue() {
    this.store
      .select(AuthFeature)
      .pipe(
        map(store => {
          if (store.error) {
            throw store.error;
          }
          return store;
        })
      )
      .subscribe(this.changeRoute.bind(this), this.displayError.bind(this));
  }

  ngOnInit() {
    this.onValue();
  }
}
