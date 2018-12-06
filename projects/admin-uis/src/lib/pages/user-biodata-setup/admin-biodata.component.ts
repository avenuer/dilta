import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterDirection } from '@dilta/client-shared';
import { TransportService } from '@dilta/electron-client';
import {
  EntityNames,
  ModelOperations,
  PresetAction,
  School,
  SchoolDict,
  User
  } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { SnotifyService } from 'ng-snotify';
import { schoolFeature } from 'projects/client-shared/src/lib/ngrx/school';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  combineLatest,
  exhaustMap,
  first,
  map
  } from 'rxjs/operators';

export interface BiodataFormPageARQMap {
  authId: string;
}

@Component({
  selector: 'admin-ui-user-biodata-form-page',
  templateUrl: './admin-biodata.component.html',
  styleUrls: ['./admin-biodata.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserBioDataFormPageComponent implements OnInit {
  /**
   * required keys for the database
   *
   * @static
   * @memberof UserBioDataFormPageBase
   */
  static requiredKeys = [
    'id',
    'name',
    'gender',
    'phoneNo',
    'class',
    'subject',
    'phoneNos',
    'level',
    'address',
    'image',
    'email',
    'authId',
    'school'
  ];

  /**
   * array containing classes
   *
   * @private
   * @type {string[]}
   * @memberof UserBioDataFormPageBase
   */
  public view$: BehaviorSubject<SchoolDict> = new BehaviorSubject(<SchoolDict>{
    classes: [],
    permisions: [],
    subjects: []
  });

  constructor(
    private store: Store<any>,
    private dir: RouterDirection,
    private transport: TransportService,
    private route: ActivatedRoute,
    private snotify: SnotifyService
  ) {}

  /**
   * remaps the event by changing it properities to
   * valid object for the database
   *
   * @param {*} $event
   * @returns
   * @memberof UserBioDataFormPageBase
   */
  remapEvent$($event: any) {
    const event$ = of($event);
    const authId$ = this.route.params.pipe(
      map((params: BiodataFormPageARQMap) => params.authId)
    );
    const schoolId$ = this.store
      .select(schoolFeature)
      .pipe(map(school => school.details.id));
    return event$.pipe(
      combineLatest(authId$, schoolId$),
      map(this.remap.bind(this))
    ) as Observable<User>;
  }

  /**
   * changes the event to the standard user event
   *
   * @param {[User, string, string]} [event, schoolId, authId]
   * @returns
   * @memberof UserBioDataFormPageBase
   */
  remap([event, authId, schoolId]: [User, string, string]) {
    event.authId = authId;
    event.school = schoolId;
    event.phoneNo = event.phoneNo.toString();
    return event;
  }

  /**
   * dispatch an action to save the school biodata details
   * to the database and store
   *
   * @param {User} $event
   * @memberof UserBioDataFormPageBase
   */
  saveBiodata($event: User) {
    this.remapEvent$($event)
      .pipe(
        exhaustMap(data =>
          this.transport.modelAction(
            EntityNames.User,
            ModelOperations.Create,
            data
          )
        ),
        first()
      )
      .subscribe(this.changeRoute.bind(this), this.displayError.bind(this));
  }

  /**
   * listen to the observable to setup the view
   *
   * @returns
   * @memberof UserBioDataFormPageBase
   */
  schoolDetails() {
    return this.store
      .select(schoolFeature)
      .pipe(exhaustMap(({ details }) => this.selectView(details)))
      .subscribe((v: SchoolDict) => {
        this.view$.next(v);
      }, this.displayError.bind(this));
  }

  /** app view state for different school categories */
  selectView({ category }: School) {
    return this.transport
      .execute<SchoolDict>(PresetAction.SchoolPreset, category)
      .pipe(
        map(view => {
          view.permisions = Object.keys(view.permisions);
          return view;
        })
      );
  }

  /**
   * retireves the error and displays it to the view
   *
   * @param {Error} err
   * @memberof UserBioDataFormPageBase
   */
  displayError(err: Error) {
    this.snotify.error(err.message, err.name);
  }

  /**
   * changes the route to the finished route page
   *
   * @param {User} user
   * @memberof UserBioDataFormPageBase
   */
  changeRoute(user: User) {
    if (user) {
      this.snotify.success(`User information successfully saved`);
      this.dir.userForm(user);
    }
  }

  ngOnInit() {}
}
