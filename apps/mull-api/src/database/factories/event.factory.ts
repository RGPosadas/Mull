import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Event, Media, User } from '../../app/entities';

const maxNumberOfWords = 6;
const maxCoHostNumber = 5;
const maxParticipants = 30;

define(Event, (faker: typeof Faker) => {
  const event = new Event();

  event.title = faker.lorem.words(maxNumberOfWords);
  event.description = faker.lorem.paragraph();
  event.startDate = faker.date.future();
  event.endDate = faker.date.future();
  event.restriction = faker.random.number(3);

  event.host = factory(User)() as any;
  event.coHosts = factory(User)().createMany(faker.random.number(maxCoHostNumber)) as any;
  event.participants = factory(User)().createMany(faker.random.number(maxParticipants)) as any;
  event.image = factory(Media)() as any;

  return event;
});
