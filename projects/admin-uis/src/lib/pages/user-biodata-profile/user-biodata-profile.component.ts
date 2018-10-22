import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, EntityNames, ModelOperations } from '@dilta/shared';
import { map, exhaustMap, combineLatest } from 'rxjs/operators';
import { AuthFeature } from 'projects/auth/src/lib/ngrx';
import { TransportService } from '@dilta/electron-client';

export interface UserBiodataParam {
  id: string;
}

@Component({
  selector: 'admin-ui-user-biodata-profile',
  templateUrl: './user-biodata-profile.component.html',
  styleUrls: ['./user-biodata-profile.component.scss']
})
export class UserBiodataProfileComponent implements OnInit {
  public isEditable$: Observable<boolean>;

  /** allows editable */

  /** userBiodata */
  public userBio$: Observable<User>;

  constructor(
    private store: Store<any>,
    private actr: ActivatedRoute,
    private route: Router,
    private transport: TransportService
  ) {}

  onEdit($event: boolean) {
    if ($event) {
      this.route.navigate(['biodata']);
    }
  }

  /** check if edit is allowed */
  isEditable(biodata: Observable<User>) {
    return this.store.select(AuthFeature).pipe(
      map(({ details }) => details),
      combineLatest(biodata),
      map(([auth, user]) => user.id === user.authId)
    );
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
      )
    );
  }

  ngOnInit() {
    this.userBio$ = this.getBiodata();
    this.isEditable$ = this.isEditable(this.userBio$);
  }
}
