import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  Parent,
  EntityNames,
  ModelOperations,
  parentRelationToKey,
  PresetAction
} from '@dilta/shared';
import { RouterDirection, ClientUtilService } from 'client-shared';
import { AbstractTransportService } from 'transport';
import { Observable } from 'rxjs';
import { exhaustMap, map, first, combineLatest, tap } from 'rxjs/operators';

export interface ParentBioProfilePM {
  // unique parent id
  phoneNo: string;
}

interface ViewObject {
  lgas: string[];
  states: string[];
}

@Component({
  selector: 'admin-ui-parent-bio-profile',
  templateUrl: './parent-bio-profile.component.html',
  styleUrls: ['./parent-bio-profile.component.scss']
})
export class ParentBioProfileComponent implements OnInit {
  parent$: Observable<Parent>;
  view$: Observable<ViewObject>;

  constructor(
    private actR: ActivatedRoute,
    private dir: RouterDirection,
    private transport: AbstractTransportService,
    private util: ClientUtilService
  ) {}

  createView() {
    const lgas$ = this.transport.execute<string[]>(PresetAction.Lga);
    const states$ = this.transport.execute<string[]>(PresetAction.State);
    return lgas$.pipe(
      combineLatest(states$),
      map(([lgas, states]) => Object.assign({ lgas, states }) as ViewObject),
      first()
    );
  }

  retrieveParent() {
    return this.actR.params.pipe(
      exhaustMap(({ phoneNo }: ParentBioProfilePM) =>
        this.transport.modelAction<Parent>(
          EntityNames.Parent,
          ModelOperations.Retrieve,
          { phoneNo }
        )
      ),
      map(parent =>
        parent
          ? Object.assign(parent, {
              relationship: parentRelationToKey(parent.relationship)
            })
          : parent
      )
    );
  }

  editParent() {
    this.parent$
      .pipe(first())
      .subscribe(
        parent => this.dir.editParent(parent),
        err => this.util.error(err)
      );
  }

  createParent() {
    this.actR.params
      .pipe(
        map((param: ParentBioProfilePM) => param.phoneNo),
        combineLatest(this.parent$),
        tap(console.log),
        map(([phoneNo, parent]) => (parent ? parent : phoneNo)),
        first()
      )
      .subscribe(res => {
        if (typeof res === 'string') {
          // create route page
          this.dir.createParent(res);
        }
      });
  }

  // children(id: string) {
  //   this.route.navigate(['student', id]);
  // }

  ngOnInit() {
    this.view$ = this.createView();
    this.parent$ = this.retrieveParent();
    this.createParent();
  }
}
