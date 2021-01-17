import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Event, Media, User } from '../../app/entities';

define(Event, (faker: typeof Faker) => {
  const event = new Event();

  // event.id = faker.random.number();
  event.title = faker.lorem.lines();
  event.description = faker.lorem.paragraph();
  event.startDate = faker.date.future();
  event.endDate = faker.date.future();
  event.restriction = faker.random.number(3);

  event.host = factory(User)() as any;
  event.coHosts = factory(User)().createMany(faker.random.number(5)) as any;
  event.participants = factory(User)().createMany(faker.random.number(30)) as any;
  event.image = factory(Media)() as any;

  return event;
});
