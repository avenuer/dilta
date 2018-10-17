import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, exhaustMap, first } from 'rxjs/operators';
import { TransportService } from '@dilta/electron-client';
import {
  SchoolDict,
  User,
  EntityNames,
  ModelOperations,
  School
} from '@dilta/shared';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { schoolFeature } from 'projects/client-shared/src/lib/ngrx/school';

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
   * obbservable of mapped school json
   *
   * @private
   * @type {Observable<SchoolDict>}
   * @memberof UserBioDataFormPageBase
   */
  private school$: Observable<SchoolDict>;

  /**
   * err displayed to the view
   *
   * @private
   * @type {string}
   * @memberof UserBioDataFormPageBase
   */
  public err$: BehaviorSubject<string> = new BehaviorSubject(undefined);

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
    private route: ActivatedRoute,
    private router: Router,
    private transport: TransportService
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
    const authId$ = this.route.queryParams.pipe(
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
      .pipe(map(({ details }) => this.selectView(details)))
      .subscribe((v: SchoolDict) => {
        this.view$.next(v);
      }, this.displayError.bind(this));
  }

  /** app view state for different school categories */
  selectView({ category }: School) {
    // const view = this.util.schoolPreset(category || ('primary' as any));
    // view.permisions = Object.keys(view.permisions);
    // return view;
    return {};
  }

  /**
   * retireves the error and displays it to the view
   *
   * @param {Error} err
   * @memberof UserBioDataFormPageBase
   */
  displayError(err: Error) {
    this.err$.next(err.message);
    setTimeout(() => {
      this.err$.next(null);
    }, 3000);
  }

  /**
   * changes the route to the finished route page
   *
   * @param {User} user
   * @memberof UserBioDataFormPageBase
   */
  changeRoute(user: User) {
    if (user) {
      this.router.navigate(['finished']);
    }
  }

  ngOnInit() {}
}
