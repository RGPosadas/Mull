import { Channel } from '../entities';
import { mockAllEvents } from '../event/event.mockdata';
import { mockAllPosts } from '../post/post.mockdata';
import { CreateChannelInput } from './inputs/channel.input';

export const mockAllChannels: Channel[] = [
  {
    id: 1,
    name: 'private',
    rights: 2,
    posts: mockAllPosts,
    participants: null,
    event: mockAllEvents[1],
  },
  {
    id: 2,
    name: 'Group Chat',
    rights: 1,
    posts: mockAllPosts,
    participants: null,
    event: mockAllEvents[2],
  },
  {
    id: 3,
    name: 'Announcements',
    rights: 0,
    posts: mockAllPosts,
    participants: null,
    event: mockAllEvents[0],
  },
];

export const mockCreateChannel: CreateChannelInput = { name: 'inputChannel', rights: 0 };
