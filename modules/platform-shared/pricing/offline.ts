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
  )
};

export const classicOfflinePricing: BoquePricing = {
  subscription: LiensceSubscription.Classic,
  ranges: planRanges.map((sub, index) =>
    subscriptionBoquePrice(LiensceSubscriptionBasePrice.Classic, sub, index)
  )
};

export const superOfflinePricing: BoquePricing = {
  subscription: LiensceSubscription.Super,
  ranges: planRanges.map((sub, index) =>
    subscriptionBoquePrice(LiensceSubscriptionBasePrice.Super, sub, index)
  )
};
