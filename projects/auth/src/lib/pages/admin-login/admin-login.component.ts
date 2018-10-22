import { AuthFeature, AuthLogin, Authsuccess } from '../../ngrx';
import { Component, OnInit } from '@angular/core';
import { RouterDirection } from '@dilta/client-shared';
import { Login } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'auth-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AuthUserLoginComponent implements OnInit {
  public err$ = new BehaviorSubject(undefined);

  constructor(private store: Store<any>, private dir: RouterDirection) {}

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
    this.dir.loginForm(auth);
  }

  /**
   * displays the error to the child component
   *
   * @param {Error} err
   * @memberof AuthUserLoginBase
   */
  displayError(err: Error) {
    this.err$.next(err.message);
    setTimeout(() => {
      this.err$.next(undefined);
    }, 4000);
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
