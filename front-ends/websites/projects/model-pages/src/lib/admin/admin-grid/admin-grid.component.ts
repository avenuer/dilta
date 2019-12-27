import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersGridConfig, GridConfig, User } from '@dilta/shared';

export type CleanUser = User & { no: number };


@Component({
  selector: 'admin-ui-user-biodata-grid',
  styleUrls: ['./admin-grid.component.scss'],
  templateUrl: './admin-grid.component.html'
})

export class AdminUserBiodataGridComponent implements OnInit {

  @Input()
  public users: CleanUser[] = [];

  @Input()
  public config: GridConfig = {

  };

  public keys = UsersGridConfig;

  @Output()
  public emitter = new EventEmitter();
  @Output()
  public search = new EventEmitter();

  @Output()
  public paginator = new EventEmitter();

  constructor() { }

  ngOnInit() { }
}
