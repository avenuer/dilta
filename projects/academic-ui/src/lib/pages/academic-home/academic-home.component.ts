import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'acada-academic-home',
  templateUrl: './academic-home.component.html',
  styleUrls: ['./academic-home.component.scss']
})
export class AcademicHomeComponent implements OnInit {

  constructor(public router: Router) { }

  changeRoute(path: string) {
    const route = ['academics'];
    if (path !== 'home') {
      route.push(path);
    }
    this.router.navigate(route);
  }

  ngOnInit() {
  }

}
