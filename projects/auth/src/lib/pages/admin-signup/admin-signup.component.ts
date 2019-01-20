import { AuthFeature, AuthSignUp } from '../../ngrx';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  ClientUtilService,
  RouterDirection,
  schoolFeature
} from '@dilta/client-shared';
import { Auth, School, Signup, AuthenticationLevels } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { isNil } from 'lodash';
import { Subscription, Observable } from 'rxjs';
import { first, map, skipWhile, combineLatest, exhaustMap } from 'rxjs/operators';
import { ClientAuthService } from '../../services/auth.service';

const { Administrator, Busar, Manager, Teacher } = AuthenticationLevels;

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
export class AuthUserSignupComponent implements OnInit {
  /**
   * levels of authorization passed to the subcomponent
   *
   * @public
   * @memberof AuthUserSignupBase
   */
  public authLevels = [Administrator, Busar, Manager, Teacher];

  constructor(
    private dir: RouterDirection,
    private store: Store<any>,
    private util: ClientUtilService,
    private auth: ClientAuthService
  ) {}

  currentUser(): Observable<Auth> {
    return this.store
      .select(AuthFeature)
      .pipe(map(auth => (auth ? auth.details : (auth as any))));
  }

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
        combineLatest(this.currentUser()),
        map(([school, user]) => (school ? school : user.school)),
        map(school => (typeof school === 'string' ? school : school.id)),
        map((schId) => Object.assign($event, { school: schId })),
        exhaustMap((signup) => this.auth.signup(signup)),
        map(authtoken => authtoken.details),
        first()
      )
      .subscribe(auth => this.changeRoute(auth), this.sendError.bind(this));
  }

  /**
   * changes the route
   *
   * @param {string} userId
   * @memberof AuthUserSignupBase
   */
  changeRoute(auth: Auth) {
    if (auth) {
      this.util.success('Auth SignUp', `successfully signed up user ${auth.username}`);
      this.dir.signupForm(auth);
    }
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

  ngOnInit() {}
}
