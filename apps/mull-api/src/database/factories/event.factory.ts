import faker = require('faker');
import { define, factory } from 'typeorm-seeding';
import { Event, Media, User } from '../../app/entities';

/* eslint-disable @typescript-eslint/no-explicit-any */

define(Event, () => {
  const maxNumberOfWords = 6;
  const maxCoHostNumber = 5;
  const maxParticipants = 30;
  const startDate = faker.date.soon(faker.random.number(5));
  const endDate = faker.date.soon(6 + faker.random.number(5));
  const event = new Event();

  event.title = faker.lorem.words(maxNumberOfWords);
  event.description = faker.lorem.paragraph();
  event.startDate = startDate;
  event.endDate = endDate;
  event.restriction = faker.random.number(3);

  event.host = factory(User)() as any;
  event.coHosts = factory(User)().createMany(faker.random.number(maxCoHostNumber)) as any;
  event.participants = factory(User)().createMany(faker.random.number(maxParticipants)) as any;
  event.image = factory(Media)() as any;

  return event;
});
