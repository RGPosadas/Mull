import { RegistrationMethod } from '@mull/types';
import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Media, User } from '../../app/entities';

define(User, (faker: typeof Faker) => {
  const user = new User();

  // user.id = faker.random.number();
  user.password = faker.internet.password();
  user.email = faker.internet.email();
  user.name = faker.name.firstName() + ' ' + faker.name.lastName();
  user.description = faker.lorem.sentence();
  user.dob = faker.date.past();

  user.timezone = faker.lorem.word();
  user.registrationMethod = faker.random.objectElement<RegistrationMethod>(RegistrationMethod);
  user.tokenVersion = 0;

  user.avatar = factory(Media)() as any;

  return user;
});
