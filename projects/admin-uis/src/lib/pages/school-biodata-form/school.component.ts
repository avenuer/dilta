import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { RouterDirection, SchoolActionSuccess } from '@dilta/client-shared';
import { TransportService } from '@dilta/electron-client';
import {
  EntityNames,
  ModelOperations,
  PresetAction,
  School
  } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { SnotifyService } from 'ng-snotify';
import { Observable } from 'rxjs';
import { exhaustMap, first, map } from 'rxjs/operators';

const ErrorDisplayTimeOut = 4000;

/**
 * ui for setting up school biodata
 *
 * @export
 * @class SchoolComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'admin-ui-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchoolDataFormComponent implements OnInit {

  /**
   * list of nigerian states
   *
   * @public
   * @memberof SchoolComponent
   */
  public states$: Observable<string[]>;

  /**
   * list of local Govts in nigeria
   *
   * @memberof SchoolComponent
   */
  public lgas$: Observable<string[]>;

  /**
   * list of school categories suported
   *
   * @memberof SchoolComponent
   */
  public schoolCategories$: Observable<string[]>;

  constructor(
    private dir: RouterDirection,
    private store: Store<any>,
    private transport: TransportService,
    private route: ActivatedRoute,
    private snotify: SnotifyService
  ) {}

  /**
   * triggers when the form is submitted for saving in the database
   *
   * @param {Partial<School>} $event
   * @memberof SchoolComponent
   */
  onSubmit($event: School | Partial<School>) {
    this.transport.log('debug', {
      message: `submiting school data`,
      trace: `SchoolComponent::onSubmit`,
      module: 'AdminUiModule'
    });
    this.route.params
      .pipe(
        map(({ id }) => Object.assign({}, $event, { globalId: id })),
        exhaustMap((school: School) =>
          this.transport.modelAction<School>(
            EntityNames.School,
            ModelOperations.Create,
            school
          )
        )
      )
      .pipe(first())
      .subscribe(this.changeRoute.bind(this), this.displayErr.bind(this));
  }

  /**
   * displays the error to the view
   *
   * @param {Error} err
   * @memberof SchoolComponent
   */
  displayErr(err: Error) {
    this.transport.log('error', {
      message: `displaying error:: ${err.message}`,
      trace: `SchoolComponent::displayErr`,
      module: 'AdminUiModule'
    });
    this.snotify.error(err.message, err.name);
  }

  /**
   * changes the route to the admin page for setup
   *
   * @param {School} school
   * @returns
   * @memberof SchoolComponent
   */
  changeRoute(school: School) {
    this.store.dispatch(new SchoolActionSuccess(school));
    this.transport.log('debug', {
      message: `changing route to admin/${school.id}`,
      trace: `SchoolComponent::changeRoute`,
      module: 'AdminUiModule'
    });
    this.snotify.success(`School details saved successfully`);
    this.dir.schoolForm(school);
  }

  ngOnInit() {
    this.states$ = this.transport.execute(PresetAction.State);
    this.lgas$ = this.transport.execute(PresetAction.Lga);
    this.schoolCategories$ = this.transport.execute(
      PresetAction.SchoolCategories
    );
  }
}
