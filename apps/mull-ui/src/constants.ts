import { EventRestriction, IEvent } from '@mull/types';

/**
 * enum of the current routes for the application
 */
export enum ROUTES {
  LOGIN = '/login',
  HOME = '/home',
  MAP = '/map',
  CREATE_EVENT = '/create-event',
  TOOLS = '/tools',
  MESSAGES = '/messages',
  PROFILE = '/profile',
}

export const DAY_IN_MILLISECONDS = 86400000;

export const dummyEvent: IEvent = {
  id: 1,
  title: 'Test title',
  description:
    'Lorem ipsum dolor sit amet, regione invidunt democritum vim in, movet antiopam gubergren ne per. Est nibh magna scribentur ea, vel te munere deseruisse disputationi, eros meis ludus ne sea. Odio prompta legendos in sea, ut mei scripta labores theophrastus, id molestie probatus periculis mea. Noluisse invenire splendide sed ne, at erat quando laudem nec, possim apeirian vix at. At eam animal efficiendi interpretaris, eirmod offendit adversarium per et, summo qualisque efficiendi in has. Vel detraxit accusata ea.',
  startDate: new Date(2000, 0, 1, 0, 0, 0, 0),
  endDate: new Date(2000, 0, 2, 0, 0, 0, 0),
  location: {
    id: 1,
    point: '1260 Remembrance Road Montreal, Qc',
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
