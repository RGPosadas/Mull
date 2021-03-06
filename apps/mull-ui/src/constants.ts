import { WasteCategory } from '@mull/types';

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
  GROUPCHAT: { url: '/messages/event/:id/group-chat', displayName: 'Group Chat' },
  ANNOUNCEMENTS: { url: '/messages/event/:id/announcements', displayName: 'Announcements' },
  PROFILE: {
    DISPLAY: '/profile',
    EDIT: '/profile/edit',
    ADDFRIENDS: '/profile/add-friends',
    PORTFOLIO: '/profile/portfolio',
  },
  DIRECT_MESSAGES: { url: '/messages/dms', displayName: 'Direct Messages' },
  EVENT_MESSAGE_LIST: { url: '/messages/event', displayName: 'Event Messages' },
  LOGIN: '/login',
  REGISTER: '/register',
  EVENT_BY_ID: '/events/:id',
  TOKEN_REDIRECT: '/token-redirect/:token',
  MY_FRIENDS: '/my-friends',
  SETTINGS: '/settings',
  OTHER_USER_PROFILE: '/other-user-profile',
  USER_BY_ID: '/user/:id',
  NOT_FOUND: '/not-found',
};

export const DAY_IN_MILLISECONDS = 86400000;

export const MULL_MODEL_URL =
  'https://raw.githubusercontent.com/cristian-aldea/mull-model/main/tfjs-2/model.json';

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

export const WasteIconUrlMap: { [a in WasteCategory]: string } = {
  [WasteCategory.COMPOST]: 'assets/icons/trash-recognition-icons/CompostIcon.svg',
  [WasteCategory.EWASTE]: 'assets/icons/trash-recognition-icons/GeneralIcon.svg',
  [WasteCategory.TRASH]: 'assets/icons/trash-recognition-icons/TrashIcon.svg',
  [WasteCategory.RECYCLABLE]: 'assets/icons/trash-recognition-icons/RecycleIcon.svg',
};

export const WasteIconMap: { [a in WasteCategory]: HTMLImageElement } = {
  [WasteCategory.COMPOST]: new Image(),
  [WasteCategory.EWASTE]: new Image(),
  [WasteCategory.TRASH]: new Image(),
  [WasteCategory.RECYCLABLE]: new Image(),
};

for (const [category, image] of Object.entries(WasteIconMap)) {
  image.src = WasteIconUrlMap[category];
}
