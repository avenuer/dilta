import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityNames, Manager, ModelOperations } from '@dilta/shared';
import { RouterDirection, ClientUtilService } from 'client-shared';
import { AbstractTransportService } from 'transport';

import { exhaustMap, first } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * this components provides ui for setting up the
 * school managers
 *
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
    private transport: AbstractTransportService,
    private route: ActivatedRoute,
    private util: ClientUtilService
  ) {}

  /**
   * saves the managers info into the database
   *
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
