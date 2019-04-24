import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientUtilService, PrinterService } from '@dilta/client-shared';
import { Store } from '@ngrx/store';
import { TransportService } from '@dilta/electron-client';
import { AuthLogOut } from 'projects/auth/src/lib/ngrx';
import { ElectronActions, ElectronOperations, Synchronization } from '@dilta/shared';
import { first } from 'rxjs/operators';

@Component({
  selector: 'acada-academic-home',
  templateUrl: './academic-home.component.html',
  styleUrls: ['./academic-home.component.scss'],
})
export class AcademicHomeComponent implements OnInit {
  constructor(
    private store: Store<any>,
    private router: Router,
    private util: ClientUtilService,
    private transport: TransportService,
  ) {}

  changeRoute(path: string) {
    const route = ['academics'];
    if (path !== 'home') {
      route.push(path);
    }
    this.router.navigate(route);
  }

  sync(direction: string) {
    this.transport
      .execute<ElectronOperations<string>>(ElectronActions.DatabaseSync, Synchronization[direction])
      .pipe(first())
      .subscribe(
        ({ data, operation }) => this.util.success(operation, data),
        err => this.util.error(err)
      );
  }

  update() {
    this.transport
      .execute<ElectronOperations<string>>(ElectronActions.Update)
      .pipe(first())
      .subscribe(
        ({ data, operation }) => this.util.success(operation, data),
        err => this.util.error(err)
      );
  }

  logout() {
    this.store.dispatch(new AuthLogOut());
    this.router.navigate(['']);
  }

  ngOnInit() {}
}
