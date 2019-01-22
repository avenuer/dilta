/**
 * subscription volume and allowed
 *
 * @export
 * @interface Subscription
 */
export interface Subscription {
  paid: number;
  allowed: number;
}

/**
 * all ranges of BoquePricing for a paritcular boque
 *
 * @export
 * @interface BoquePricing
 */
export interface BoquePricing {
  subscription: LiensceSubscription;
  ranges: BoquePrice[];
}

/**
 * Subscription bought by the user
 *
 * @export
 * @interface Boque
 * @extends {Subscription}
 */
export interface Boque extends Subscription {
  subscription: LiensceSubscription;
}

/**
 * price breakdown for each subscription
 *
 * @export
 * @interface BoquePrice
 * @extends {Subscription}
 */
export interface BoquePrice extends Subscription {
  product: number;
  agent: number;
}

/**
 * Subsricption types
 *
 * @export
 * @enum {number}
 */
export enum LiensceSubscription {
  Basic,
  Classic,
  Super
}

/**
 * Base prices for various subscription ranges
 *
 * @export
 * @enum {number}
 */
export enum LiensceSubscriptionBasePrice {
  Basic = 5500,
  Classic = 8500,
  Super = 15000
}

const allowed = (paid: number, index = 0) =>
  Math.floor(paid + paid * (0.8 - 0.2 * index));

export const planRanges: Subscription[] = [
  {
    paid: 50
  },
  {
    paid: 150
  },
  {
    paid: 300
  },
  {
    paid: 500
  }
].map((range, index) =>
  Object.assign(range, { allowed: allowed(range.paid, index) })
);

/**
 * calculates the various
 *
 * @export
 * @param {number} basePrice
 * @returns
 */
export function subscriptionBoquePrice(
  basePrice: LiensceSubscriptionBasePrice,
  sub: Subscription,
  index = 0
) {
  let reductionRate = 0.165 * index;
  reductionRate = reductionRate > 0.4 ? 0.385 : reductionRate;
  const priceRatio =
    index === 0 ? 1 : Math.floor((1 - reductionRate) * 10) / 10;
  basePrice = (basePrice / 50) * priceRatio;
  const price = basePrice * sub.paid;
  const agent = Math.floor((price * 0.235) / 100) * 100;
  return {
    ...sub,
    agent,
    product: price - agent
  } as BoquePrice;
}
