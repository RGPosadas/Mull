import { RegistrationMethod } from '@mull/types';
import { User } from '../entities';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';

export const mockPartialUser: Partial<User> = {
  password: 'password',
  email: 'mock@mock.com',
  dob: new Date(),
  name: 'Mock McMockson',
  registrationMethod: RegistrationMethod.LOCAL,
  avatar: null,
};

export const mockNewPartialUser: CreateUserInput = {
  password: 'password',
  email: 'mock2@mock.com',
  dob: new Date(),
  name: 'Mock McMockson Jr.',
  registrationMethod: RegistrationMethod.LOCAL,
  joinDate: new Date(),
};

export const mockUpdateUserInput: UpdateUserInput[] = [
  {
    id: 1,
    description: 'I am no longer very good programmer :(',
  },
  { id: 7, description: 'my new description!' },
];

export const mockedUser1: User = {
  id: 1,
  password: '$2b$10$Wo/ClOmaI/qItblWM1saEeWgqv9S9nt6QO4KW1kBXdzPT1.q8XuuG',
  email: 'mock@mock.com',
  timezone: '',
  name: 'Bob',
  dob: new Date(),
  description: 'I am very good programmer',
  avatar: null,
  friends: [],
  tokenVersion: 0,
  registrationMethod: RegistrationMethod.LOCAL,
  joinDate: new Date('2020-10-31T22:09:00.000Z'),
};

export const mockedUser2: User = {
  id: 7,
  password: 'password',
  email: 'me@me.com',
  timezone: '',
  name: 'Cristian',
  dob: new Date(),
  description: "There's a first for everything",
  avatar: {
    id: 2,
    mediaType: 'jpeg',
    post: null,
  },
  friends: [],
  tokenVersion: 0,
  registrationMethod: RegistrationMethod.GOOGLE,
  joinDate: new Date(),
};

export const mockedUser3: User = {
  id: 3,
  password: 'password',
  email: 'me@me.com',
  timezone: '',
  name: 'Jose',
  dob: new Date(),
  description: 'What goes up, comes down',
  avatar: null,
  friends: [],
  registrationMethod: RegistrationMethod.GOOGLE,
  tokenVersion: 0,
  joinDate: new Date(),
};

export const mockedUser4: User = {
  id: 12,
  password: 'abc123',
  email: 'tim@green.co',
  timezone: '',
  name: 'Tim',
  dob: new Date(),
  description: '',
  friends: [],
  registrationMethod: RegistrationMethod.LOCAL,
  tokenVersion: 0,
  avatar: null,
};

mockedUser1.friends = [mockedUser2, mockedUser4];
mockedUser2.friends = [mockedUser1, mockedUser4];
mockedUser3.friends = [mockedUser1];

export const mockAllUsers: User[] = [mockedUser1, mockedUser2, mockedUser3, mockedUser4];

// It's mockAllUsers[0] and mockAllUsers[1] with updated avatar and description
export const mockExpectedUpdatedUser: User[] = [
  {
    id: 1,
    avatar: {
      id: 1,
      mediaType: 'jpeg',
      post: null,
    },
    description: 'I am no longer very good programmer :(',
    email: 'mock@mock.com',
    timezone: '',
    name: 'Bob',
    dob: new Date(),
    password: '$2b$10$Wo/ClOmaI/qItblWM1saEeWgqv9S9nt6QO4KW1kBXdzPT1.q8XuuG',
    registrationMethod: RegistrationMethod.LOCAL,
    tokenVersion: 0,
    events: null,
    joinDate: new Date('2020-10-31T22:09:00.000Z'),
    friends: [],
  },
  {
    id: 7,
    password: 'password',
    email: 'me@me.com',
    timezone: '',
    name: 'Cristian',
    dob: new Date(),
    description: 'my new description!',
    avatar: {
      id: 2,
      mediaType: 'png',
      post: null,
    },
    friends: [],
    tokenVersion: 0,
    registrationMethod: RegistrationMethod.GOOGLE,
    joinDate: new Date(),
  },
];

// It's mockAllUsers[0] that added mockAllUsers[2]
export const mockAddedFriend: User = {
  id: 1,
  password: '$2b$10$Wo/ClOmaI/qItblWM1saEeWgqv9S9nt6QO4KW1kBXdzPT1.q8XuuG',
  email: 'mock@mock.com',
  timezone: '',
  name: 'Bob',
  dob: new Date(),
  description: 'I am very good programmer',
  avatar: null,
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
      tokenVersion: 0,
      registrationMethod: RegistrationMethod.LOCAL,
      avatar: null,
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
      tokenVersion: 0,
      registrationMethod: RegistrationMethod.LOCAL,
      avatar: null,
    },
    {
      id: 3,
      password: 'password',
      email: 'me@me.com',
      timezone: '',
      name: 'Jose',
      dob: new Date(),
      description: 'What goes up, comes down',
      avatar: null,
      friends: [],
      registrationMethod: RegistrationMethod.GOOGLE,
      tokenVersion: 0,
      joinDate: new Date(),
    },
  ],
  tokenVersion: 0,
  registrationMethod: RegistrationMethod.LOCAL,
  joinDate: new Date('2020-10-31T22:09:00.000Z'),
};
