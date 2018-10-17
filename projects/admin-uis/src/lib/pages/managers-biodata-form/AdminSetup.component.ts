import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Manager, EntityNames, ModelOperations } from '@dilta/shared';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TransportService } from '@dilta/electron-client';

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

  public schoolId: string;

  public localSubscription: Subscription[] = [];

  constructor(
    private _router: Router,
    private _actR: ActivatedRoute,
    private transport: TransportService
  ) {}

  /**
   * saves the managers info into the database
   *
   * @param {Manager} $event triggerd from sub-component view
   * @memberof AdminSetupComponent
   */
  saveManagers($event: Manager) {
    this.transport
      .modelAction<Manager>(EntityNames.Manager, ModelOperations.Create, {
        ...$event,
        id: this.schoolId,
        school: this.schoolId
      })
      .pipe(first())
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
      this._router.navigate(['signup', manager.school]);
    }
  }

  ngOnInit() {
    this.schoolId = this._actR.snapshot.params['id'];
  }
}
