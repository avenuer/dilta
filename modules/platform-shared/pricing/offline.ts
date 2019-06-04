import {
  BoquePricing,
  LiensceSubscription,
  planRanges,
  LiensceSubscriptionBasePrice,
  subscriptionBoquePrice
} from './interface';

export const basicOfflinePricing: BoquePricing = {
  subscription: LiensceSubscription.Basic,
  ranges: planRanges.map((sub, index) =>
    subscriptionBoquePrice(LiensceSubscriptionBasePrice.Basic, sub, index)
  ),
  features: [
    `School management functionalities`,
    `cross-platform mobile application`
  ]
};

export const classicOfflinePricing: BoquePricing = {
  subscription: LiensceSubscription.Classic,
  ranges: planRanges.map((sub, index) =>
    subscriptionBoquePrice(LiensceSubscriptionBasePrice.Classic, sub, index)
  ),
  features: [
    ...basicOfflinePricing.features,
    `customer care and support`,
    `feature request and feedback`
  ]
};

export const superOfflinePricing: BoquePricing = {
  subscription: LiensceSubscription.Super,
  ranges: planRanges.map((sub, index) =>
    subscriptionBoquePrice(LiensceSubscriptionBasePrice.Super, sub, index)
  ),
  features: [
    ...classicOfflinePricing.features,
    `Online student Portal`,
    `Platform customization`,
  ]
};
