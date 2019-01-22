import { Component, OnInit } from '@angular/core';
import {
  basicOfflinePricing,
  BoquePrice,
  classicOfflinePricing,
  superOfflinePricing
} from '@dilta/shared';

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
      offers: basicOfflinePricing.features,
      ranges: planPriceRange(basicOfflinePricing.ranges)
    },
    {
      name: 'Classic',
      price: 170,
      offers: classicOfflinePricing.features,
      ranges: planPriceRange(classicOfflinePricing.ranges)
    },
    {
      name: 'Super',
      price: 300,
      offers: superOfflinePricing.features,
      ranges: planPriceRange(superOfflinePricing.ranges)
    }
  ];

  constructor() {}

  ngOnInit() {}
}

function planPriceRange(ranges: BoquePrice[]) {
  const prices: PriceRanges[] = [];
  for (let i = 0; i < ranges.length; i++) {
    const current = ranges[i];
    const previous = ranges[i - 1];
    prices.push({
      actual: current.paid,
      max: current.allowed,
      min: previous ? previous.allowed : 0,
      price: current.agent + current.product
    });
  }
  return prices;
}
