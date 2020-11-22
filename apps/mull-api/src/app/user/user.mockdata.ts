import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { User } from '../entities';
import { UserType } from '@mull/types';

export const mockPartialUser: CreateUserInput | UpdateUserInput = {
  password: 'password',
  email: 'mock@mock.com',
  dob: new Date(),
  name: 'Mock McMockson',
  type: UserType.LOCAL,
};

export const mockAllUsers: User[] = [
  {
    id: 1,
    password: '$2b$10$Wo/ClOmaI/qItblWM1saEeWgqv9S9nt6QO4KW1kBXdzPT1.q8XuuG',
    email: 'gr@ph.ql',
    timezone: '',
    name: 'Bob',
    dob: new Date(),
    description: 'I am very good programmer',
    friends: [
      {
        id: 7,
        password: 'password',
        email: 'me@me.com',
        timezone: '',
        name: 'Cristian',
        dob: new Date(),
        description: "There's a first for everything",
        friends: [],
        type: UserType.LOCAL,
      },
      {
        id: 12,
        password: 'abc123',
        email: 'tim@green.co',
        timezone: '',
        name: 'Tim',
        dob: new Date(),
        description: '',
        friends: [],
        type: UserType.LOCAL,
      },
    ],
    type: UserType.LOCAL,
  },
  {
    id: 7,
    password: 'password',
    email: 'me@me.com',
    timezone: '',
    name: 'Cristian',
    dob: new Date(),
    description: "There's a first for everything",
    friends: [
      {
        id: 1,
        password: 'abc123',
        email: 'gr@ph.ql',
        timezone: '',
        name: 'Bob',
        dob: new Date(),
        description: 'I am very good programmer',
        friends: [],
        type: UserType.LOCAL,
      },
      {
        id: 12,
        password: 'abc123',
        email: 'tim@green.co',
        timezone: '',
        name: 'Tim',
        dob: new Date(),
        description: '',
        friends: [],
        type: UserType.LOCAL,
      },
    ],
    type: UserType.GOOGLE,
  },
];
