import { Component, OnInit } from '@angular/core';
import { AcademicService } from '../../services/academic.service';
import { Observable } from 'rxjs';
import { ClassDetailedStat } from '@dilta/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'acada-level-static-details-page',
  templateUrl: './level-static-details-page.component.html',
  styleUrls: ['./level-static-details-page.component.scss']
})
export class LevelStaticDetailsPageComponent implements OnInit {

  statics$: Observable<ClassDetailedStat[]>;

  constructor(private acada: AcademicService, private router: Router) { }

  viewClass(detail: ClassDetailedStat) {
    this.router.navigate(['academics', 'levels', detail.value]);
  }


  ngOnInit() {
    this.statics$ = this.acada.levelStatics();
  }

}
