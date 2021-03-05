import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Post, User } from '../../app/entities';

/* eslint-disable @typescript-eslint/no-explicit-any */

define(Post, (faker: typeof Faker, totalChannels: number) => {
  const post = new Post();
  post.createdTime = faker.date.past();
  post.channel = faker.random.number({ min: 1, max: totalChannels }) as any;
  post.user = factory(User)() as any;
  post.message = faker.lorem.words(10);
  return post;
});
