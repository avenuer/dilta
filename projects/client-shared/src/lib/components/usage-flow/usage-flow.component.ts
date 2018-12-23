import { Component, OnInit } from '@angular/core';

interface Flow {
  title: string;
  info: string;
}

@Component({
  selector: 'web-usage-flow',
  templateUrl: './usage-flow.component.html',
  styleUrls: ['./usage-flow.component.scss']
})
export class UsageFlowComponent implements OnInit {
  flows: Flow[] = [
    {
      info: `To use the application offline, purchase of a digital liensce is neccessary
       for activation, while for online usage SignUp of schools is only required for starters.`,
      title: `Sign-Up`
    },
    {
      info: `This involves the uploading of various students, parent and staffs
      biodata's online for storage and class setups. `,
      title: `Upload`
    },
    {
      info: `This involves creating a new record of a subject for the desired
       term and session and individual students scores are simultaneouly recorded. `,
      title: `Record`
    },
    {
      info: `This involves printing the student academic report for the
       term and session and for online payment is required before proceeding to printing. `,
      title: `Print`
    }
  ];

  constructor() {}

  ngOnInit() {}
}
