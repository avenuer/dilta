import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransportService } from '@dilta/electron-client';
import {
  EntityNames,
  ModelOperations,
  Parent,
  parentRelationToKey,
  ParentRelationship,
  PresetAction
} from '@dilta/shared';
import { Store } from '@ngrx/store';
import { schoolFeature } from 'projects/client-shared/src/lib/ngrx/school';
import { Observable } from 'rxjs';
import { exhaustMap, first, map, combineLatest } from 'rxjs/operators';
import { ClientUtilService, RouterDirection } from '@dilta/client-shared';

export interface ParentFormEditorQPM {
  // unique parent id
  phoneNo: string;
}

interface ViewObject {
  lgas: string[];
  states: string[];
}

@Component({
  selector: 'admin-ui-parent-form-editor',
  templateUrl: './parent-form-editor.component.html',
  styleUrls: ['./parent-form-editor.component.scss']
})
export class ParentFormEditorComponent implements OnInit {
  parent$: Observable<Parent>;

  view$: Observable<ViewObject>;

  constructor(
    private store: Store<any>,
    private actR: ActivatedRoute,
    private dir: RouterDirection,
    private transport: TransportService,
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

  saveParent(parent: Parent) {
    parent.relationship = ParentRelationship[parent.relationship];
    this.store
      .select(schoolFeature)
      .pipe(
        map(({ details }) => Object.assign(parent, { school: details.id })),
        exhaustMap(newParent =>
          newParent.id ? this.update(parent) : this.create(parent)
        ),
        first()
      )
      .subscribe(this.changeRoute.bind(this), err => this.util.error(err));
  }

  create(parent: Parent) {
    return this.transport.modelAction(
      EntityNames.Parent,
      ModelOperations.Create,
      parent
    );
  }

  update(parent: Parent) {
    return this.transport.modelAction(
      EntityNames.Parent,
      ModelOperations.Update,
      parent.id,
      parent
    );
  }

  changeRoute(id: string) {
    // this.route.navigate(['parent', id]);
  }

  retrieveParent() {
    return this.actR.queryParams.pipe(
      map((param: ParentFormEditorQPM) => param.phoneNo),
      exhaustMap(phoneNo =>
        this.transport.modelAction<Parent>(
          EntityNames.Parent,
          ModelOperations.Retrieve,
          { phoneNo } as Partial<Parent>
        )
      ),
      map(parent =>
        Object.assign(parent, {
          profession: parentRelationToKey(parent.profession)
        })
      )
    );
  }

  ngOnInit() {
    this.view$ = this.createView();
    this.parent$ = this.retrieveParent();
  }
}
