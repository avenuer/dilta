import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'web-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public about = `
    Marker is aimed to help Schools to provide student academic results
    to the parents as the parents also wants it at their own comfort, remove
    drudgery for teachers from daily tasks to occasional stressful tasks. I.e Attendance
    and help determine  and access the school academic performance and  growth rate for proprietors.
  `;

  constructor() {}

  ngOnInit() {}
}
