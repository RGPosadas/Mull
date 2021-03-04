import { Channel, DirectMessageChannel, EventChannel } from '../entities';
import { mockAllEvents } from '../event/event.mockdata';
import { mockAllPosts } from '../post/post.mockdata';
import { mockAllUsers } from '../user/user.mockdata';
import { CreateDmChannelInput, CreateEventChannelInput } from './inputs/channel.input';

export const mockAllChannels: Channel[] = [
  {
    id: 5,
    posts: mockAllPosts,
  },
  {
    id: 6,
    posts: mockAllPosts,
  },
];

export const mockAllEventChannels: EventChannel[] = [
  {
    id: 1,
    name: 'private',
    rights: 2,
    posts: mockAllPosts,
    event: mockAllEvents[1],
  },
  {
    id: 2,
    name: 'Group Chat',
    rights: 1,
    posts: mockAllPosts,
    event: mockAllEvents[2],
  },
  {
    id: 3,
    name: 'Announcements',
    rights: 0,
    posts: mockAllPosts,
    event: mockAllEvents[0],
  },
];

export const mockAllDirectMessageChannels: DirectMessageChannel[] = [
  {
    id: 4,
    participants: [mockAllUsers[0], mockAllUsers[1]],
    posts: mockAllPosts,
  },
];

export const mockCreateEventChannel: CreateEventChannelInput = { name: 'inputChannel', rights: 0 };

export const mockCreateDmChannel: CreateDmChannelInput = {
  participants: [mockAllUsers[0], mockAllUsers[1]],
};
