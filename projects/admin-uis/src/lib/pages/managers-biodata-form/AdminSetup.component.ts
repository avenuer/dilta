import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientUtilService, RouterDirection } from '@dilta/client-shared';
import { TransportService } from '@dilta/electron-client';
import { EntityNames, Manager, ModelOperations } from '@dilta/shared';
import { exhaustMap, first } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  public managers$: Observable<Manager>;

  constructor(
    private dir: RouterDirection,
    private transport: TransportService,
    private route: ActivatedRoute,
    private util: ClientUtilService
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
        exhaustMap(({ id }) => {
          $event.school = id;
          return $event.id
            ? this.updateManager($event)
            : this.createManager($event);
        }),
        first()
      )
      .subscribe(this.changeRoute.bind(this), err => this.util.error(err));
  }

  /**
   * Action dispatched to create managers
   *
   * @param {Manager} details
   * @returns
   * @memberof ManagerDataFormComponent
   */
  createManager(details: Manager) {
    return this.transport.modelAction<Manager>(
      EntityNames.Manager,
      ModelOperations.Create,
      details
    );
  }

  /**
   * Action dispatched to update managers
   *
   * @param {Manager} details
   * @returns
   * @memberof ManagerDataFormComponent
   */
  updateManager(details: Manager) {
    return this.transport.modelAction<Manager>(
      EntityNames.Manager,
      ModelOperations.Update,
      details.id,
      details
    );
  }

  /**
   * changes the route to the next page
   *
   * @memberof AdminSetupComponent
   */
  changeRoute(manager?: Manager) {
    if (manager) {
      this.util.success('Manager', `Manager's Information saved Successfully`);
      this.dir.managerForm(manager);
    }
  }

  getManagers() {
    return this.route.params.pipe(
      exhaustMap(({ id }) =>
        this.transport.modelAction<Manager>(
          EntityNames.Manager,
          ModelOperations.Retrieve,
          { school: id }
        )
      )
    );
  }

  ngOnInit() {
    this.managers$ = this.getManagers();
  }
}
