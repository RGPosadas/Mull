import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { User } from '../entities';

export const mockPartialUser: CreateUserInput | UpdateUserInput = {
  password: 'password',
  email: 'mock@mock.com',
  dob: new Date(),
  name: 'Mock McMockson',
};

export const mockAllUsers: User[] = [
  {
    id: 1,
    password: 'abc123',
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
      },
    ],
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
      },
    ],
  },
];
