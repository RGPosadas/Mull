import { Channel } from '../entities';
import { mockAllPosts } from '../post/post.mockdata';
import { mockAllUsers } from '../user/user.mockdata';
import { CreateChannelInput } from './inputs/channel.input';

export const mockAllChannels: Channel[] = [
  {
    id: 1,
    name: 'private',
    rights: 0,
    posts: mockAllPosts,
    participants: mockAllUsers,
  },
  {
    id: 2,
    name: 'groupchat',
    rights: 0,
    posts: mockAllPosts,
    participants: mockAllUsers,
  },
  {
    id: 3,
    name: 'announcements',
    rights: 0,
    posts: mockAllPosts,
    participants: mockAllUsers,
  },
];

export const mockCreateChannel: CreateChannelInput = { name: 'inputChannel', rights: 0 };
