import { Channel, DirectMessageChannel, EventChannel } from '../entities';
import { mockAllEvents } from '../event/event.mockdata';
import { mockAllPosts } from '../post/post.mockdata';
import { mockAllUsers } from '../user/user.mockdata';

const eventChannel = new EventChannel();
const directMessageChannel = new DirectMessageChannel();

export const mockAllChannels: Channel[] = [
  {
    id: 5,
    posts: mockAllPosts,
    validateReadPermission: directMessageChannel.validateReadPermission,
    validateWritePermission: directMessageChannel.validateWritePermission,
  },
  {
    id: 2,
    posts: mockAllPosts,
    validateReadPermission: eventChannel.validateReadPermission,
    validateWritePermission: eventChannel.validateWritePermission,
  },
];

export const mockAllEventChannels: EventChannel[] = [
  {
    id: 1,
    name: 'private',
    rights: 2,
    posts: mockAllPosts,
    event: mockAllEvents[1],
    validateReadPermission: eventChannel.validateReadPermission,
    validateWritePermission: eventChannel.validateWritePermission,
  },
  {
    id: 2,
    name: 'Group Chat',
    rights: 1,
    posts: mockAllPosts,
    event: mockAllEvents[2],
    validateReadPermission: eventChannel.validateReadPermission,
    validateWritePermission: eventChannel.validateWritePermission,
  },
  {
    id: 3,
    name: 'Announcements',
    rights: 0,
    posts: mockAllPosts,
    event: mockAllEvents[0],
    validateReadPermission: eventChannel.validateReadPermission,
    validateWritePermission: eventChannel.validateWritePermission,
  },
];

export const mockAllDirectMessageChannels: DirectMessageChannel[] = [
  {
    id: 4,
    participants: [mockAllUsers[0], mockAllUsers[1]],
    posts: mockAllPosts,
    validateReadPermission: directMessageChannel.validateReadPermission,
    validateWritePermission: directMessageChannel.validateWritePermission,
  },
];
