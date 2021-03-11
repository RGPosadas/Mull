import { DetectionResult, EventRestriction, ISerializedEvent } from '@mull/types';
import { WasteType } from './app/services/maps';

/**
 * enum of the current routes for the application
 */
export const ROUTES = {
  HOME: '/home',
  DISCOVER: { url: '/home/discover', displayName: 'Discover' },
  UPCOMING: { url: '/home/upcoming', displayName: 'Upcoming' },
  MY_EVENTS: { url: '/home/myevents', displayName: 'My Events' },
  MAP: '/map',
  CREATE_EVENT: '/create-event',
  CAMERA: '/camera',
  MESSAGES: '/messages',
  GROUPCHAT: { url: '/messages/group-chat', displayName: 'Group Chat' },
  ANNOUNCEMENTS: { url: '/messages/announcements', displayName: 'Announcements' },
  PROFILE: { DISPLAY: '/profile', EDIT: '/profile/edit' },
  LOGIN: '/login',
  REGISTER: '/register',
  EVENT_BY_ID: '/events/:id',
  TOKEN_REDIRECT: '/token-redirect/:token',
  DIRECT_MESSAGES: '/dms',
  EVENT_MESSAGE_LIST: '/event-messages-list',
};

export const DAY_IN_MILLISECONDS = 86400000;

export const MULL_MODEL_URL =
  'https://raw.githubusercontent.com/cristian-aldea/mull-model/main/tfjs-2/model.json';

// TODO delete when US 2.1 is completed
export const dummyProfilePictures: string[] = [
  'https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg',
  'https://i.pinimg.com/236x/92/f0/ed/92f0edd9b0ecefdd5b7a48b8e1f7d340.jpg',
  'https://pbs.twimg.com/profile_images/748593045566853124/9DDVz0uT_400x400.jpg',
];

export const dummyEvent: ISerializedEvent = {
  id: 1,
  title: 'Test title',
  description:
    'Lorem ipsum dolor sit amet, regione invidunt democritum vim in, movet antiopam gubergren ne per. Est nibh magna scribentur ea, vel te munere deseruisse disputationi, eros meis ludus ne sea. Odio prompta legendos in sea, ut mei scripta labores theophrastus, id molestie probatus periculis mea. Noluisse invenire splendide sed ne, at erat quando laudem nec, possim apeirian vix at. At eam animal efficiendi interpretaris, eirmod offendit adversarium per et, summo qualisque efficiendi in has. Vel detraxit accusata ea.',
  startDate: '2009-06-15T13:45:30',
  endDate: '2009-06-15T13:45:30',
  location: {
    id: 1,
    title: '1260 Remembrance Road Montreal, Qc',
  },
  restriction: EventRestriction.NONE,
  participants: [
    {
      id: 1,
      name: 'User 1',
    },
    {
      id: 2,
      name: 'User 2',
    },
  ],
  host: {
    id: 3,
    name: 'Test user',
  },
  coHosts: [
    {
      id: 4,
      name: 'First CoHost',
    },
  ],
  image: {
    id: 1,
    mediaType: 'jpeg',
  },
};

export const dummyDetectionResults: DetectionResult[] = [
  {
    bndBox: {
      height: 50,
      width: 100,
      x: 20,
      y: 40,
    },
    class: 'recyclable',
    confidence: 0.8,
  },
];

const mockUser1 = {
  id: 1,
  password: '$2b$10$Wo/ClOmaI/qItblWM1saEeWgqv9S9nt6QO4KW1kBXdzPT1.q8XuuG',
  email: 'mock@mock.com',
  timezone: '',
  name: 'Bob',
  dob: new Date(),
  description: 'I am very good programmer',
  avatar: { id: 1, mediaType: 'png' },
  friends: null,
  tokenVersion: 0,
  registrationMethod: null,
  joinDate: new Date('2020-10-31T22:09:00.000Z'),
};

const mockUser2 = {
  id: 2,
  password: '$2b$10$Wo/ClOmaI/qItblWM1saEeWgqv9S9nt6QO4KW1kBXdzPT1.q8XuuG',
  email: 'mock@mock.com',
  timezone: '',
  name: 'Bob',
  dob: new Date(),
  description: 'I am very good programmer',
  avatar: { id: 1, mediaType: 'png' },
  friends: null,
  tokenVersion: 0,
  registrationMethod: null,
  joinDate: new Date('2020-10-31T22:09:00.000Z'),
};

const mockChannel = {
  id: 3,
  name: 'announcements',
  rights: 0,
  posts: null,
  participants: null,
};

export const mockPosts = [
  {
    id: 1,
    channel: mockChannel,
    user: mockUser1,
    message: 'message 1 from user 1, current user id is 1',
    createdTime: new Date(),
  },
  {
    id: 2,
    channel: mockChannel,
    user: mockUser2,
    message: 'message 2 from user 2',
    createdTime: new Date(),
  },
  {
    id: 3,
    channel: mockChannel,
    user: mockUser2,
    message: 'message 3 from user 3',
    createdTime: new Date(),
  },
];

export const mockChannelWithPosts = {
  id: 3,
  name: 'announcements',
  rights: 0,
  posts: mockPosts,
  event: dummyEvent,
};

export const monthNames = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const WasteTypeSvgMap = {
  [WasteType.COMPOST]: 'assets/icons/trash-recognition-icons/CompostIcon.svg',
  [WasteType.EWASTE]: 'assets/icons/trash-recognition-icons/GeneralIcon.svg',
  [WasteType.TRASH]: 'assets/icons/trash-recognition-icons/TrashIcon.svg',
  [WasteType.RECYCLABLE]: 'assets/icons/trash-recognition-icons/RecycleIcon.svg',
};
