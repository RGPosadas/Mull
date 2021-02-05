import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Media } from '../../app/entities';

/* eslint-disable @typescript-eslint/no-explicit-any */

define(Media, (faker: typeof Faker) => {
  const mediaType = faker.random.arrayElement(['jpeg']);
  const media = new Media(mediaType);

  return media;
});
