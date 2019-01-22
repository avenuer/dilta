import * as uuidRandom from 'uuid/v4';
import { School } from 'modules/platform-shared/models';
import { schoolCategories } from 'modules/presets/schools.preset';
import { localGovts, states } from 'modules/presets/states.presets';
import {
  Boque,
  planRanges,
  LiensceSubscription,
  BoquePrice
} from 'modules/platform-shared/pricing/interface';
import {
  superOfflinePricing,
  basicOfflinePricing,
  classicOfflinePricing
} from 'modules/platform-shared/pricing/offline';
import { encryptOrg } from './database';

export async function generateLiensce(inq) {
  encryptOrg(await liensceBoquePrompt(inq), await schoolDetailPrompt(inq));
}

interface BoquePrompt {
  subscription: keyof LiensceSubscription;
  volume: string;
}

export async function liensceBoquePrompt(inq) {
  const promptResponse: BoquePrompt = (await inq([
    {
      name: 'subscription',
      message: 'Category of Subscription',
      type: 'list',
      choices: ['Basic', 'Classic', 'Super']
    },
    {
      name: 'volume',
      message: 'population count that reflect school student population',
      type: 'list',
      choices: planRanges.map(p => p.paid.toString())
    }
  ])) as any;

  const { boque, boquePricing,  subscription } =  lienceBoque(promptResponse);
  displayBoquePricing(subscription, boquePricing);
  return boque;
}

function lienceBoque({ subscription, volume }: BoquePrompt) {
  let boque: Boque;
  let boquePricing: BoquePrice;
  [basicOfflinePricing, classicOfflinePricing, superOfflinePricing].forEach(
    pricing => {
      if (pricing.subscription === LiensceSubscription[subscription]) {
        pricing.ranges.forEach(range => {
          if (range.paid === Number(volume)) {
            boque = {
              ...range,
              subscription: pricing.subscription
            };
            boquePricing = range;
          }
        });
      }
    }
  );
  return { boque, boquePricing, subscription };
}

function displayBoquePricing(
  subscription: string,
  price: BoquePrice
) {
  console.clear();
  console.log(` ----------------------------------------------------------------------`);
  console.log(` -----------------------Boque ${ subscription } ----------------------- `);
  console.log(` ---------------------------------------------------------------------- `);
  console.log(` ------------  Volume: ${price.paid}       Max: ${price.allowed}  -------- `);
  console.log(` -----------------------------------------------------------------------`);
  console.log(` ------------  Product:                    ${price.product} ------------`);
  console.log(` ------------  Agent:                      ${price.agent}   ------------`);
  console.log(` -----------------------------------------------------------------------`);
  console.log(` ------------  Total:                      ${price.agent + price.product}   ------------`);
  console.log(` -----------------------------------------------------------------------`);
  console.log(` ---------------------- Dilta Marker Pricing Cli -----------------------`);
  console.log(` -----------------------------------------------------------------------`);
}

export async function schoolDetailPrompt(inq) {
  const school: School = (await inq([
    {
      name: 'name',
      message: 'name of the school'
    },
    {
      name: 'email',
      message: 'school email'
    },
    {
      name: 'category',
      message: 'category of school',
      type: 'list',
      choices: schoolCategories
    },
    {
      name: 'description',
      message: 'description of school'
    },
    {
      name: 'address',
      message: 'address of school'
    },
    {
      name: 'town',
      message: 'LGA of the school',
      type: 'list',
      choices: localGovts()
    },
    {
      name: 'state',
      message: 'School state',
      type: 'list',
      choices: states()
    }
  ])) as any;
  school.id = uuidRandom();
  school.globalId = school.id;
  school.logo = '';
  return school;
}
