import { RegistrationMethod } from '@mull/types';
import { mockAllDirectMessageChannels } from '../channel/channel.mockdata';
import { Friend } from '../entities';
import { mockAllPosts } from '../post/post.mockdata';

// Friends of mockAllUsers[0] with id: 1
export const mockAllFriendsOfId1: Friend[] = [
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
    latestPost: mockAllPosts[3],
    directMessageChannel: mockAllDirectMessageChannels[0],
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
    latestPost: null,
    directMessageChannel: null,
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
    latestPost: null,
    directMessageChannel: null,
  },
];

// Friends of mockAllUsers[2] with id: 3
export const mockAllFriendsOfId3: Friend[] = [
  {
    id: 1,
    password: 'abc123',
    email: 'gr@ph.ql',
    timezone: '',
    name: 'Bob',
    dob: new Date(),
    description: 'I am very good programmer',
    friends: [],
    registrationMethod: RegistrationMethod.LOCAL,
    tokenVersion: 0,
    avatar: null,
    latestPost: null,
    directMessageChannel: null,
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
    registrationMethod: RegistrationMethod.LOCAL,
    tokenVersion: 0,
    avatar: null,
    latestPost: null,
    directMessageChannel: null,
  },
];
