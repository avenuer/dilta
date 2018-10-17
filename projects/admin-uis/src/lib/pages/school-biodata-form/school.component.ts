import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { School, EntityNames, ModelOperations } from '@dilta/shared';
// import { states, schoolCategories, localGovts } from '@dilta/presets';
import { map, first } from 'rxjs/operators';
import { TransportService } from '@dilta/electron-client';

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
   * error displayed to the view.
   *
   * @private
   * @type {string}
   * @memberof SchoolComponent
   */
  public err: string;

  public schoolId: string;

  /**
   * list of nigerian states
   *
   * @public
   * @memberof SchoolComponent
   */
  public states = []; // states();

  /**
   * list of local Govts in nigeria
   *
   * @memberof SchoolComponent
   */
  public lgas = []; // localGovts();

  /**
   * list of school categories suported
   *
   * @memberof SchoolComponent
   */
  public schoolCategories = []; // schoolCategories;

  constructor(
    private actRoute: ActivatedRoute,
    private route: Router,
    private transport: TransportService
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
    this.transport
      .modelAction<School>(EntityNames.School, ModelOperations.Create, {
        ...$event,
        id: this.schoolId
      })
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
    this.err = err.message;
    setTimeout(() => {
      this.err = undefined;
    }, ErrorDisplayTimeOut);
  }

  /**
   * changes the route to the admin page for setup
   *
   * @param {School} school
   * @returns
   * @memberof SchoolComponent
   */
  changeRoute(school: School) {
    this.transport.log('debug', {
      message: `changing route to admin/${school.id}`,
      trace: `SchoolComponent::changeRoute`,
      module: 'AdminUiModule'
    });
    this.route.navigate(['admin', school.id]);
  }

  ngOnInit() {
    this.schoolId = this.actRoute.snapshot.params['id'];
  }
}
