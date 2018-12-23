import { Component, OnInit } from '@angular/core';

interface PriceRanges {
  min?: number;
  max?: number;
  actual?: number;
  text?: string;
  price: number | string;
}

interface OfflinePlan {
  name: string;
  price: number;
  ranges: PriceRanges[];
  offers: string[];
}

@Component({
  selector: 'web-offline-pricing',
  templateUrl: './offline-pricing.component.html',
  styleUrls: ['./offline-pricing.component.scss']
})
export class OfflinePricingComponent implements OnInit {
  plans: OfflinePlan[] = [
    {
      name: 'Basic',
      price: 110,
      offers: [
        `School management functionalities`,
        `cross-platform mobile application`
      ],
      ranges: [
        { min: 0, max: 75, actual: 50, price: '5,500' },
        { min: 76, max: 200, actual: 150, price: '13,200' },
        { min: 201, max: 400, actual: 300, price: '19,800' },
        { text: 'greater than 400', price: '25,000' }
      ]
    },
    {
      name: 'Classic',
      price: 170,
      offers: [
        `customer care and support`,
        `School managment system`,
        `cross-platform mobile application `,
        `feature request and feedback`
      ],
      ranges: [
        { min: 0, max: 75, actual: 50, price: '8,500' },
        { min: 76, max: 200, actual: 150, price: '20,400' },
        { min: 201, max: 400, actual: 300, price: '30,600' },
        { text: 'greater than 400', price: '40,000' }
      ]
    },
    {
      name: 'Super',
      price: 300,
      offers: [
        `School managment system`,
        `Online student Portal`,
        `Platform customization`,
        `cross-platform mobile application `,
        `customer care and support`,
        `feature request and feedback`
      ],
      ranges: [
        { min: 0, max: 75, actual: 50, price: '15,500' },
        { min: 76, max: 200, actual: 150, price: '30,000' },
        { min: 201, max: 400, actual: 300, price: '60,000' },
        { text: 'greater than 400', price: '100, 000' }
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}
}
