import { AcademicService } from '../../services/academic.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientUtilService } from '@dilta/client-shared';
import { ClassDetailedStat } from '@dilta/shared';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'acada-level-static-details-page',
  templateUrl: './level-static-details-page.component.html',
  styleUrls: ['./level-static-details-page.component.scss']
})
export class LevelStaticDetailsPageComponent implements OnInit {
  statics$: Observable<ClassDetailedStat[]>;

  constructor(
    private acada: AcademicService,
    private router: Router,
    private util: ClientUtilService
  ) {}

  viewClass(detail: ClassDetailedStat) {
    this.router.navigate(['academics', 'levels', detail.value]);
  }

  ngOnInit() {
    this.statics$ = this.acada.levelStatics();
    this.statics$
      .pipe(first())
      .subscribe({ error: err => this.util.error(err) });
  }
}
