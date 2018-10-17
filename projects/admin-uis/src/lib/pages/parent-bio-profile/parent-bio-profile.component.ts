import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Parent, EntityNames, ModelOperations } from '@dilta/shared';
import { exhaustMap, map } from 'rxjs/operators';
import { TransportService } from '@dilta/electron-client';
import { Observable } from 'rxjs';

export interface ParentBioProfilePM {
  // unique parent id
  id: string;
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
    private route: Router,
    private transport: TransportService
  ) {}

  retrieveParent() {
    return this.actR.params.pipe(
      exhaustMap((param: ParentBioProfilePM) =>
        this.transport.modelAction<Parent>(
          EntityNames.Parent,
          ModelOperations.Retrieve,
          { id: param.id }
        )
      )
    );
  }

  children(id: string) {
    this.route.navigate(['student', id]);
  }

  ngOnInit() {
    this.parent$ = this.retrieveParent();
  }
}
