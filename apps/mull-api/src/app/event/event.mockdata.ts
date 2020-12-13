import { CreateEventInput, UpdateEventInput } from './inputs/event.input';
import { Event } from '../entities';

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
    participants: [],
    startDate: new Date('2020-10-27T01:31:00.000Z'),
    endDate: new Date('2020-11-01T01:31:00.000Z'),
    restriction: 0,
  },
  {
    id: 36,
    title: 'Clean up rogers park',
    description: 'We love the environment',
    startDate: new Date('2020-10-29T13:30:00.000Z'),
    endDate: new Date('2020-11-01T01:30:00.000Z'),
    restriction: 1,
  },
  {
    id: 37,
    title: 'Clean up trash',
    description: 'lots of trash',
    startDate: new Date('2020-10-29T20:20:00.000Z'),
    endDate: new Date('2020-10-31T22:09:00.000Z'),
    restriction: 0,
  },
];
