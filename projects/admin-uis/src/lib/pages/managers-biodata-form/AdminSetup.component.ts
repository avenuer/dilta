import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterDirection } from '@dilta/client-shared';
import { TransportService } from '@dilta/electron-client';
import { EntityNames, Manager, ModelOperations } from '@dilta/shared';
import { BehaviorSubject, Subscription } from 'rxjs';
import { exhaustMap, first } from 'rxjs/operators';

/**
 * this components provides ui for setting up the
 * school managers
 *
 * @export
 * @class AdminSetupComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'admin-ui-admin-setup',
  templateUrl: './AdminSetup.component.html',
  styleUrls: ['./AdminSetup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerDataFormComponent implements OnInit {
  /**
   * err displayed to the component view
   *
   * @private
   * @type {string}
   * @memberof AdminSetupComponent
   */
  public err$ = new BehaviorSubject(undefined);

  constructor(
    private dir: RouterDirection,
    private transport: TransportService,
    private route: ActivatedRoute
  ) {}

  /**
   * saves the managers info into the database
   *
   * @param {Manager} $event triggerd from sub-component view
   * @memberof AdminSetupComponent
   */
  saveManagers($event: Manager) {
    this.route.params
      .pipe(
        exhaustMap(({ id }) =>
          this.transport.modelAction<Manager>(
            EntityNames.Manager,
            ModelOperations.Create,
            {
              ...$event,
              id: id,
              school: id
            }
          )
        ),
        first()
      )
      .subscribe(this.changeRoute.bind(this), this.displayError.bind(this));
  }

  /**
   * display the error to the observable
   *
   * @param {Error} e
   * @memberof AdminSetupComponent
   */
  displayError(e: Error) {
    this.err$.next(e.message);
    setTimeout(() => {
      this.err$.next(undefined);
    }, 3000);
  }

  /**
   * changes the route to the next page
   *
   * @memberof AdminSetupComponent
   */
  changeRoute(manager?: Manager) {
    if (manager) {
      this.dir.managerForm(manager);
    }
  }

  ngOnInit() {}
}
