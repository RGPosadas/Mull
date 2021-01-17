import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Media } from '../../app/entities';

define(Media, (faker: typeof Faker) => {
  const media_type = faker.random.arrayElement(['jpeg', 'jpg', 'png']);
  const media = new Media(media_type);

  return media;
});
