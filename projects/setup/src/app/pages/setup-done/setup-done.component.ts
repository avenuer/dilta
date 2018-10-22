import { Component, OnInit } from '@angular/core';
import { RouterDirection } from '@dilta/client-shared';
import { TransportService } from '@dilta/electron-client';
import { ElectronActions } from '@dilta/shared';

@Component({
  selector: 'setup-done',
  templateUrl: './setup-done.component.html',
  styleUrls: ['./setup-done.component.scss']
})
export class SetupDoneComponent implements OnInit {
  constructor(public dir: RouterDirection, public transport: TransportService) {}

  signUp() {
    this.dir.router.navigate(['auth', 'signup']);
  }

  exit() {
    this.transport.execute(ElectronActions.Relaunch);
  }

  ngOnInit() {}
}
