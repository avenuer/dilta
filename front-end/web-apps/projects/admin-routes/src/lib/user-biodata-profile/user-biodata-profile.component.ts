import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthenticationLevels,
  EntityNames,
  ModelOperations,
  USER_AUTH,
  User,
  schoolClassValueToKey
} from '@dilta/shared';
import { ClientUtilService, RouterDirection } from '@dilta/client-shared';
import { Component, OnInit } from '@angular/core';
import { combineLatest, exhaustMap, first, map, tap } from 'rxjs/operators';

import { AuthFeature } from 'projects/auth/src/lib/ngrx';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AbstractTransportService } from '@dilta/electron-client';

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
    private transport: AbstractTransportService,
    private util: ClientUtilService,
    private dir: RouterDirection
  ) {}

  editBiodata() {
    this.userBio$.pipe(first()).subscribe(user => this.dir.editUser(user));
  }

  /** check if edit is allowed */
  editableAndDeleteable(biodata: Observable<User>) {
    return this.store.select(AuthFeature).pipe(
      map(({ details }) => details),
      combineLatest(biodata),
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
    const userID$: Observable<string> = this.actr.params.pipe(
      map(params => params.id)
    );
    this.store
      .select(AuthFeature)
      .pipe(
        map(auth => auth.token),
        combineLatest(userID$),
        exhaustMap(([authToken, userId]) =>
          this.transport.execute<string>(USER_AUTH.Delete, authToken, userId)
        ),
        first()
      )
      .subscribe(res => {
        this.util.success('User details', res);
        this.route.navigate(['academics', 'admins']);
      }, err => this.util.error(err));
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
