import { Component, OnInit } from '@angular/core';

interface OnlinePlan {
  name: string;
  offers: string[];
  price: number;
}

@Component({
  selector: 'web-online-pricing',
  templateUrl: './online-pricing.component.html',
  styleUrls: ['./online-pricing.component.scss']
})
export class OnlinePricingComponent implements OnInit {
  plans: OnlinePlan[] = [
    {
      name: 'Lite',
      price: 5,
      offers: [
        `School management functionalities`,
        `cross-platform mobile application`
      ]
    },
    {
      name: 'Pro',
      price: 10,
      offers: [
        `customer care and support`,
        `School managment system`,
        `cross-platform mobile application `,
        `feature request and feedback`
      ]
    },
    {
      name: 'Super',
      price: 20,
      offers: [
        `School managment system`,
        `Online student Portal`,
        `Platform customization`,
        `cross-platform mobile application `,
        `customer care and support`,
        `feature request and feedback`,
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}
}
