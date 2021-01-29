import { Event, Media } from '../entities';
import { mockAllUsers } from '../user/user.mockdata';
import { CreateEventInput, UpdateEventInput } from './inputs/event.input';

const userA = mockAllUsers[0]; // id: 1
const userB = mockAllUsers[1]; // id: 7
const userC = mockAllUsers[2]; // id: 3

export const mockPartialEvent: CreateEventInput | UpdateEventInput = {
  id: 35,
  title: 'Liskar',
  description: 'Vroom Vroom',
  startDate: new Date('2020-10-27T01:31:00.000Z'),
  endDate: new Date('2020-11-01T01:31:00.000Z'),
  restriction: 0,
};

export const mockAllEvents: Event[] = [
  {
    id: 35,
    title: 'Liskar',
    description: 'Vroom Vroom',
    startDate: new Date('2020-10-27T01:31:00.000Z'),
    endDate: new Date('2020-11-01T01:31:00.000Z'),
    restriction: 0,
    host: userA,
    coHosts: [userB],
    participants: [userC],
    location: {
      id: 1,
      title: 'locationA',
      coordinates: null,
      placeId: 'googlePlaceIdA',
      event: null,
    },
    image: {
      id: 1,
      mediaType: 'jpeg',
      post: null,
    },
  },
  {
    id: 36,
    title: 'Clean up rogers park',
    description: 'We love the environment',
    startDate: new Date('2020-10-29T13:30:00.000Z'),
    endDate: new Date('2020-11-01T01:30:00.000Z'),
    restriction: 1,
    host: userB,
    coHosts: [userA],
    participants: [userC],
    location: {
      id: 2,
      title: 'locationB',
      coordinates: null,
      placeId: 'googlePlaceIdB',
      event: null,
    },
    image: {
      id: 2,
      mediaType: 'jpeg',
      post: null,
    },
  },
  {
    id: 37,
    title: 'Clean up trash',
    description: 'lots of trash',
    startDate: new Date('2020-10-29T20:20:00.000Z'),
    endDate: new Date('2020-10-31T22:09:00.000Z'),
    restriction: 0,
    host: userB,
    coHosts: [userA],
    participants: [],
    location: {
      id: 3,
      title: 'locationC',
      coordinates: null,
      placeId: 'googlePlaceIdC',
      event: null,
    },
    image: {
      id: 3,
      mediaType: 'jpeg',
      post: null,
    },
  },
];

export const mockQueryReturn = [
  {
    id: 37,
    title: 'Clean up trash',
    description: 'lots of trash',
    startDate: new Date('2020-10-29T20:20:00.000Z'),
    endDate: new Date('2020-10-31T22:09:00.000Z'),
    restriction: 0,
    host: userB,
    coHosts: [userA],
    participants: [],
    location_id: 3,
    location_title: 'locationC',
  },
];

export const mockExpectedQueryReturn = [
  {
    id: 37,
    title: 'Clean up trash',
    description: 'lots of trash',
    startDate: new Date('2020-10-29T20:20:00.000Z'),
    endDate: new Date('2020-10-31T22:09:00.000Z'),
    restriction: 0,
    host: userB,
    coHosts: [userA],
    participants: [],
    location: {
      id: 3,
      title: 'locationC',
    },
  },
];

export const mockImage: Media = {
  id: 1,
  mediaType: 'jpeg',
  post: null,
};
