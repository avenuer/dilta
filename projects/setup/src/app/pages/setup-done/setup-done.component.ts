import { Component, OnInit } from '@angular/core';
import { ClientUtilService, RouterDirection } from '@dilta/client-shared';
import { AbstractTransportService } from '@dilta/electron-client';
import { ElectronActions } from '@dilta/shared';

@Component({
  selector: 'setup-done',
  templateUrl: './setup-done.component.html',
  styleUrls: ['./setup-done.component.scss']
})
export class SetupDoneComponent implements OnInit {
  constructor(public dir: RouterDirection, public transport: AbstractTransportService, private util: ClientUtilService) {}

  signUp() {
    this.dir.router.navigate(['auth', 'signup']);
  }

  exit() {
    this.util.success('Liensce', 'Restarting Application');
    this.transport.execute(ElectronActions.Relaunch);
  }

  ngOnInit() {}
}
