import { AuthFeature, AuthSignUp } from '../../ngrx';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
  } from '@angular/core';
import { ClientUtilService, RouterDirection, schoolFeature } from '@dilta/client-shared';
import { Auth, School, Signup, AuthenticationLevels } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { isNil } from 'lodash';
import { Subscription } from 'rxjs';
import { first, map, skipWhile } from 'rxjs/operators';

const { Administrator,Busar, Manager, Teacher } = AuthenticationLevels;

/**
 * ui for signing up adminstartaions for login
 *
 * @export
 * @class AdminSignupComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'auth-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthUserSignupComponent implements OnInit, OnDestroy {

  /**
   * levels of authorization passed to the subcomponent
   *
   * @public
   * @memberof AuthUserSignupBase
   */
  public authLevels =  [Administrator,Busar, Manager, Teacher];

  public localSubscription: Subscription[] = [];

  constructor(private dir: RouterDirection, private store: Store<any>, private util: ClientUtilService) {}

  /**
   * action triggered by the sub components submit button
   *
   * @param {Signup} $event
   * @memberof AuthUserSignupBase
   */
  signUp($event: Signup) {
    this.store
      .select(schoolFeature)
      .pipe(
        map(store => store.details),
        skipWhile(isNil),
        first()
      )
      .subscribe((school: School) => {
        this.store.dispatch(new AuthSignUp({ ...$event, school: school.id }));
      }, this.sendError.bind(this));
  }

  /**
   * changes the route
   *
   * @param {string} userId
   * @memberof AuthUserSignupBase
   */
  changeRoute(auth: Auth) {
    if (auth) {
      this.dir.signupForm(auth);
    }
  }

  /**
   * listen for manager section of the store changes
   *
   * @memberof AuthUserSignupBase
   */
  storeListen() {
    return this.store.select(AuthFeature)
      .subscribe((state) => {
        if (state.error) {
          this.sendError(state.error);
          return;
        }
        if (state.details) {
          this.changeRoute(state.details);
        }
      });
  }

  /**
   * sends the error to the child component for display
   *
   * @param {Error} err
   * @memberof AuthUserSignupBase
   */
  sendError(err: Error) {
    this.util.error(err);
  }

  ngOnInit() {
    this.storeListen();
  }

  ngOnDestroy() {
    this.localSubscription.forEach(e => e.unsubscribe());
  }
}
