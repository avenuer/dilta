import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  Parent,
  EntityNames,
  ModelOperations,
  parentRelationToKey
} from '@dilta/shared';
import { exhaustMap, map, first, combineLatest } from 'rxjs/operators';
import { TransportService } from '@dilta/electron-client';
import { Observable } from 'rxjs';
import { RouterDirection } from '@dilta/client-shared';

export interface ParentBioProfilePM {
  // unique parent id
  phoneNo: string;
}

@Component({
  selector: 'admin-ui-parent-bio-profile',
  templateUrl: './parent-bio-profile.component.html',
  styleUrls: ['./parent-bio-profile.component.scss']
})
export class ParentBioProfileComponent implements OnInit {
  parent$: Observable<Parent>;

  constructor(
    private actR: ActivatedRoute,
    private dir: RouterDirection,
    private transport: TransportService
  ) {}

  retrieveParent() {
    return this.actR.params.pipe(
      exhaustMap((param: ParentBioProfilePM) =>
        this.transport.modelAction<Parent>(
          EntityNames.Parent,
          ModelOperations.Retrieve,
          { id: param.phoneNo }
        )
      ),
      map(parent =>
        Object.assign(parent, {
          profession: parentRelationToKey(parent.profession)
        })
      )
    );
  }

  editParent(parent: Parent) {}

  createParent() {
    this.actR.params
      .pipe(
        map((param: ParentBioProfilePM) => param.phoneNo),
        combineLatest(this.parent$),
        map(([phoneNo, parent]) => (parent ? parent : phoneNo)),
        first()
      )
      .subscribe(res => {
        if (typeof res === 'string') {
          // create route page
        }
      });
  }

  // children(id: string) {
  //   this.route.navigate(['student', id]);
  // }

  ngOnInit() {
    this.parent$ = this.retrieveParent();
  }
}
