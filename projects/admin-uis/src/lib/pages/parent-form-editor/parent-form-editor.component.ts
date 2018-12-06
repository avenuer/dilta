import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransportService } from '@dilta/electron-client';
import { EntityNames, ModelOperations, Parent } from '@dilta/shared';
import { Store } from '@ngrx/store';
import { schoolFeature } from 'projects/client-shared/src/lib/ngrx/school';
import { Observable, of } from 'rxjs';
import { exhaustMap, first, map } from 'rxjs/operators';

export interface ParentFormEditorQPM {
  // unique parent id
  id: string;
}

@Component({
  selector: 'admin-ui-parent-form-editor',
  templateUrl: './parent-form-editor.component.html',
  styleUrls: ['./parent-form-editor.component.scss']
})
export class ParentFormEditorComponent implements OnInit {
  parent$: Observable<Parent>;

  constructor(
    private store: Store<any>,
    private actR: ActivatedRoute,
    private route: Router,
    private transport: TransportService
  ) {}

  saveParent(parent: Parent) {
    this.store
      .select(schoolFeature)
      .pipe(
        exhaustMap(school =>
          this.transport.modelAction(
            EntityNames.Parent,
            ModelOperations.Create,
            { ...parent, school: school.details.id }
          )
        ),
        first()
      )
      .subscribe(this.changeRoute.bind(this), this.displayError.bind(this));
  }

  changeRoute(id: string) {
    this.route.navigate(['parent', id]);
  }

  displayError(err: Error) {}

  retrieveParent() {
    return this.actR.queryParams.pipe(
      map((param: ParentFormEditorQPM) => param.id),
      exhaustMap(id => {
        if (typeof id !== 'string' || id === '') {
          return of<Parent>({} as Parent);
        }
        return this.transport.modelAction(
          EntityNames.Parent,
          ModelOperations.Retrieve,
          { id }
        );
      })
    );
  }

  ngOnInit() {
    this.parent$ = this.retrieveParent();
  }
}
