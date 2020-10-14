import { UserType } from './user.type';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';

export const mockPartialUser: CreateUserInput | UpdateUserInput = {
  password: 'password',
  email: 'mock@mock.com',
  age: '25',
  name: 'Mock McMockson',
};

export const mockAllUsers: UserType[] = [
  {
    id: 1,
    password: 'abc123',
    email: 'gr@ph.ql',
    timezone: '',
    name: 'Bob',
    age: '',
    description: 'I am very good programmer',
    friends: [
      {
        id: 7,
        password: 'password',
        email: 'me@me.com',
        timezone: '',
        name: 'Cristian',
        age: '',
        description: "There's a first for everything",
        friends: [],
      },
      {
        id: 12,
        password: 'abc123',
        email: 'tim@green.co',
        timezone: '',
        name: 'Tim',
        age: '',
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
    age: '',
    description: "There's a first for everything",
    friends: [
      {
        id: 1,
        password: 'abc123',
        email: 'gr@ph.ql',
        timezone: '',
        name: 'Bob',
        age: '',
        description: 'I am very good programmer',
        friends: [],
      },
      {
        id: 12,
        password: 'abc123',
        email: 'tim@green.co',
        timezone: '',
        name: 'Tim',
        age: '',
        description: '',
        friends: [],
      },
    ],
  },
];
