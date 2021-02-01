import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Point } from '../../app/entities';

/* eslint-disable @typescript-eslint/no-explicit-any */

define(Point, (faker: typeof Faker, creditCard: Faker.Card) => {
  const point = new Point();
  point.lat = parseInt(creditCard.address.geo.lat);
  point.long = parseInt(creditCard.address.geo.lng);

  return point;
});
