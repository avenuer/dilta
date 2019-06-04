import { Component, OnInit } from '@angular/core';
import {
  Boque,
  cleanNumericEnums,
  LiensceSubscription,
  planRanges,
  School,
  PresetAction,
  SchoolEncryptedDBDataPlusLiensce,
  ServerActions,
  SchoolEncryptedDBData
} from '@dilta/shared';
import { Observable } from 'rxjs';
import { combineLatest, map, first } from 'rxjs/operators';
import { AbstractTransportService } from 'projects/client-shared/src/lib/abstract/transport.service';
import { Router } from '@angular/router';

interface ViewObject {
  school: School;
  states: string[];
  lgas: string[];
  categories: string[];
}

@Component({
  selector: 'web-liensce-page',
  templateUrl: 'liensce-page.component.html',
  styleUrls: ['liensce-page.component.scss']
})
export class LienscePageComponent implements OnInit {
  ranges = planRanges.map(r => r.paid);
  subscriptions = cleanNumericEnums(Object.keys(LiensceSubscription));

  boque: Boque = {} as any;

  public viewObject$: Observable<ViewObject>;
  err: string;

  constructor(
    private transport: AbstractTransportService,
    private router: Router
  ) {}

  setBoque(key: 'boque' | 'range', $event: Event) {
    const value = ($event.srcElement as HTMLSelectElement).value;
    if (key === 'boque') {
      this.boque.subscription = LiensceSubscription[value];
      return;
    }
    if (key === 'range') {
      const index = planRanges.findIndex(sub => sub.paid === Number(value));
      if (index > -1) {
        this.boque.paid = planRanges[index].paid;
        this.boque.allowed = planRanges[index].allowed;
      }
    }
  }
  /**
   * triggers when the form is submitted for saving in the database
   *
   * @param {Partial<School>} $event
   * @memberof SchoolComponent
   */
  onSubmit( $event: School | Partial<School>, boque: Boque) {
    this.transport
      .execute<SchoolEncryptedDBDataPlusLiensce>(
        ServerActions.GenerateEncryptedLienscePlusData,
        $event,
        boque
      )
      .pipe(first())
      .subscribe(
        ({ data, liensce }) => {
          console.log({ data, liensce });
          this.saveLiensce(liensce);
          this.saveInvoice(data);
          // this.navigate();
        },
        (err: Error) => {
          this.err = err.message;
          setTimeout(() => {
            this.err = undefined;
          }, 2500);
        }
      );
  }

  saveLiensce(encrypted: string) {}

  saveInvoice(school: SchoolEncryptedDBData) {}

  navigate() {
    this.router.navigateByUrl('/');
  }

  reactiveView(): Observable<ViewObject> {
    return this.transport
      .execute<string[]>(PresetAction.State)
      .pipe(
        combineLatest(
          this.transport.execute<string[]>(PresetAction.Lga),
          this.transport.execute(PresetAction.SchoolCategories)
        )
      )
      .pipe(
        map(([states, lgas, categories]) =>
          Object.assign({ school: undefined, states, lgas, categories })
        )
      );
  }

  ngOnInit() {
    this.viewObject$ = this.reactiveView();
  }
}
