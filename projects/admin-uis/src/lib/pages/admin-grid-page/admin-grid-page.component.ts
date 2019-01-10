import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientUtilService, PrinterService } from '@dilta/client-shared';
import { TransportService } from '@dilta/electron-client';
import {
  EntityNames,
  FindResponse,
  ModelOperations,
  User,
  UsersGridConfig,
  DateFormat
} from '@dilta/shared';
import { Store } from '@ngrx/store';
import { AuthLogOut } from 'projects/auth/src/lib/ngrx/auth.action';
import { format } from 'date-fns';
import { first, map } from 'rxjs/operators';

type CleanUser = User & { no: number };

@Component({
  selector: 'admin-ui-admin-grid-page',
  templateUrl: './admin-grid-page.component.html',
  styleUrls: ['./admin-grid-page.component.scss']
})
export class AdminGridPageComponent implements OnInit {
  public users: CleanUser[];

  private Pagined = {
    total: 0,
    skip: 0,
    sort: 'name'
  };

  public keys = UsersGridConfig;

  constructor(
    private transport: TransportService,
    private router: Router,
    private store: Store<any>,
    private printer: PrinterService,
    public util: ClientUtilService
  ) {}

  newAdmin() {
    this.store.dispatch(new AuthLogOut());
    this.router.navigate(['auth', 'signup']);
  }

  /**
   * Clean Data to match grid
   *
   * @param {User[]} admins
   * @returns
   * @memberof AdminGridPageComponent
   */
  cleanData(admins: User[]): CleanUser[] {
    return admins.map((admin, no) => Object.assign({}, admin, { no: no + 1 }));
  }

  retriveUsers$() {
    return this.transport
      .modelAction<FindResponse<User>>(
        EntityNames.User,
        ModelOperations.Find,
        {}
      )
      .pipe(first());
  }

  print() {
    this.transport
      .modelAction<FindResponse<User>>(
        EntityNames.User,
        ModelOperations.Find,
        {},
        { limit: this.Pagined.total, sort: 'name', skip: 0 }
      )
      .pipe(
        first(),
        map(res => res.data)
      )
      .subscribe(
        users => {
          this.printer.printTable(UsersGridConfig, users, {
            filename: `school staffs ${format(Date.now(), DateFormat)}`
          });
        },
        error => this.util.error(error)
      );
  }

  ngOnInit() {
    this.retriveUsers$().subscribe(
      res => {
        this.users = this.cleanData(res.data);
        this.Pagined.total = res.total;
      },
      error => this.util.error(error)
    );
  }
}
