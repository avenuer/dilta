import {
  ClientUtilService,
  PrinterService,
  RouterDirection
} from '@dilta/client-shared';
import { Component, OnInit } from '@angular/core';
import {
  DateFormat,
  EntityNames,
  FindResponse,
  ModelOperations,
  User,
  UsersGridConfig,
  schoolClassValueToKey,
  GridConfig
} from '@dilta/shared';
import { first, map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TransportService } from '@dilta/electron-client';
import { format } from 'date-fns';
import { PageEvent } from '@angular/material';
import { CleanUser } from '../../components/admin-grid/admin-grid.component';


@Component({
  selector: 'admin-ui-admin-grid-page',
  templateUrl: './admin-grid-page.component.html',
  styleUrls: ['./admin-grid-page.component.scss']
})
export class AdminGridPageComponent implements OnInit {
  public users: CleanUser[] = [];

  public config: GridConfig = {
    filter: true,
    paginator: {
      length: 0,
      count: 0,
      options: [10]
    }
  };

  private _params = { limit: 10, skip: 0, sort: 'name' };

  public keys = UsersGridConfig;

  private queryObj: Partial<User> | string = {};

  constructor(
    private transport: TransportService,
    private router: Router,
    private store: Store<any>,
    private printer: PrinterService,
    public util: ClientUtilService,
    public dir: RouterDirection
  ) {}

  newAdmin() {
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
    return admins.map((admin, no) =>
      Object.assign({}, admin, {
        no: no + 1,
        class: schoolClassValueToKey(admin.class)
      })
    );
  }

  retriveUsers$() {
    return this.transport
      .modelAction<FindResponse<User>>(
        EntityNames.User,
        ModelOperations.Find,
        this.queryObj,
        this._params
      )
      .pipe(first());
  }

  search(query: string | Partial<User>) {
    this.queryObj = query && query !== '' ? query : {};
    this.retriveUsers$().subscribe(
      res => {
        this.users = this.cleanData(res.data);
        this.config.paginator.length = res.total;
        this.config.paginator.count = res.limit;
      },
      error => this.util.error(error)
    );
  }

  paginator($event: PageEvent) {
    this._params.skip = this._params.limit * $event.pageIndex;
    this.search(this.queryObj);
  }

  print() {
    this.transport
      .modelAction<FindResponse<User>>(
        EntityNames.User,
        ModelOperations.Find,
        this.queryObj,
        { limit: this.config.paginator.length, sort: 'name', skip: 0 }
      )
      .pipe(
        first(),
        map(res => this.cleanData(res.data))
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
    this.search({});
  }
}
