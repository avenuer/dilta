import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthenticationLevels,
  EntityNames,
  ModelOperations,
  User,
  schoolClassValueToKey
} from '@dilta/shared';
import { ClientUtilService, RouterDirection } from '@dilta/client-shared';
import { Component, OnInit } from '@angular/core';
import { combineLatest, exhaustMap, first, map, tap } from 'rxjs/operators';

import { AuthFeature } from 'projects/auth/src/lib/ngrx';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TransportService } from '@dilta/electron-client';

export interface UserBiodataParam {
  id: string;
}

interface ViewConditions {
  canEdit: boolean;
  canDelete: boolean;
}

@Component({
  selector: 'admin-ui-user-biodata-profile',
  templateUrl: './user-biodata-profile.component.html',
  styleUrls: ['./user-biodata-profile.component.scss']
})
export class UserBiodataProfileComponent implements OnInit {
  public view$: Observable<ViewConditions>;

  /** allows editable */

  /** userBiodata */
  public userBio$: Observable<User>;

  constructor(
    private store: Store<any>,
    private actr: ActivatedRoute,
    private route: Router,
    private transport: TransportService,
    private util: ClientUtilService,
    private dir: RouterDirection
  ) {}

  editBiodata() {
    this.userBio$.pipe(first())
      .subscribe(user => this.dir.editUser(user));
  }

  /** check if edit is allowed */
  editableAndDeleteable(biodata: Observable<User>) {
    return this.store.select(AuthFeature).pipe(
      map(({ details }) => details),
      combineLatest(biodata),
      tap(console.log),
      map(
        ([auth, user]) =>
          Object.assign({
            canEdit: auth.id === user.authId,
            canDelete:
              auth.level === AuthenticationLevels.Administrator &&
              auth.id !== user.authId
          }) as ViewConditions
      )
    );
  }

  deleteBiodata() {
    this.actr.params
      .pipe(
        exhaustMap(params => this.transport.execute<boolean>('', params.id)),
        first()
      )
      .subscribe(res => {}, err => this.util.error(err));
  }

  /** gets the user biodata */
  getBiodata() {
    return this.actr.params.pipe(
      exhaustMap(({ id }: UserBiodataParam) =>
        this.transport.modelAction<User>(
          EntityNames.User,
          ModelOperations.Retrieve,
          {
            id
          }
        )
      ),
      map(user =>
        Object.assign(user, {
          class: schoolClassValueToKey(user.class)
        })
      )
    );
  }

  ngOnInit() {
    this.userBio$ = this.getBiodata();
    this.view$ = this.editableAndDeleteable(this.userBio$);
  }
}
