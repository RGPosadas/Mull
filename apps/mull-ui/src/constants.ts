import { EventRestriction, ISerializedEvent } from '@mull/types';

/**
 * enum of the current routes for the application
 */
export const ROUTES = {
  HOME: '/home',
  DISCOVER: '/home/discover',
  UPCOMING: '/home/upcoming',
  MY_EVENTS: '/home/myevents',
  MAP: '/map',
  CREATE_EVENT: '/create-event',
  TOOLS: '/tools',
  MESSAGES: '/messages',
  GROUPCHAT: '/messages/group-chat',
  ANNOUNCEMENTS: '/messages/announcements',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  EVENT_BY_ID: '/events/:id',
  TOKEN_REDIRECT: '/token-redirect/:token',
};

export const DAY_IN_MILLISECONDS = 86400000;

// TODO delete when US 2.1 is completed
export const dummyProfilePictures: string[] = [
  'https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg',
  'https://i.pinimg.com/236x/92/f0/ed/92f0edd9b0ecefdd5b7a48b8e1f7d340.jpg',
  'https://pbs.twimg.com/profile_images/748593045566853124/9DDVz0uT_400x400.jpg',
];

export const dummyEvent: ISerializedEvent = {
  id: '1',
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
      name: 'User 1',
    },
    {
      name: 'User 2',
    },
  ],
  host: {
    name: 'Test user',
  },
};
