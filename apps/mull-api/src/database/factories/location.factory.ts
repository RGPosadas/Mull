import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Location, Point } from '../../app/entities';

/* eslint-disable @typescript-eslint/no-explicit-any */
define(Location, (faker: typeof Faker) => {
  const creditCard = faker.helpers.createCard();

  const location = new Location();
  location.title = `${creditCard.address.streetB}, ${creditCard.address.city}, ${creditCard.address.state}, ${creditCard.address.zipcode}`;
  location.coordinates = factory(Point)(creditCard) as any;
  location.placeId = '1';
  return location;
});
