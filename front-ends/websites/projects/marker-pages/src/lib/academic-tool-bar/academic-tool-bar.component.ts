import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ClientUtilService } from 'client-shared';
import { AbstractTransportService } from 'transport';
import { AuthLogOut } from 'auth-store';


@Component({
  selector: 'lib-academic-tool-bar',
  templateUrl: './academic-tool-bar.component.html',
  styleUrls: ['./academic-tool-bar.component.scss']
})
export class AcademicToolBarComponent implements OnInit {
  constructor(
    private store: Store<any>,
    private router: Router,
    private util: ClientUtilService,
    private transport: AbstractTransportService
  ) {}

  changeRoute(path: string) {
    const route = ['academics'];
    if (path !== 'home') {
      route.push(path);
    }
    this.router.navigate(route);
  }

  sync(direction: string) {
    // this.transport
    //   .execute<ElectronOperations<string>>(ElectronActions.DatabaseSync, Synchronization[direction])
    //   .pipe(first())
    //   .subscribe(
    //     ({ data, operation }) => this.util.success(operation, data),
    //     err => this.util.error(err)
    //   );
  }

  update() {
    // this.transport
    //   .execute<ElectronOperations<string>>(ElectronActions.Update)
    //   .pipe(first())
    //   .subscribe(
    //     ({ data, operation }) => this.util.success(operation, data),
    //     err => this.util.error(err)
    //   );
  }

  logout() {
    this.store.dispatch(new AuthLogOut());
    this.router.navigate(['']);
  }

  ngOnInit() {}
}
