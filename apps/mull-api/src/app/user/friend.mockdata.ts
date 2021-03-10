import { RegistrationMethod } from '@mull/types';
import { mockAllDirectMessageChannels } from '../channel/channel.mockdata';
import { Friend } from '../entities';
import { mockAllPosts } from '../post/post.mockdata';

// Friends of mockAllUsers[0]
export const mockAllFriends: Friend[] = [
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
];
