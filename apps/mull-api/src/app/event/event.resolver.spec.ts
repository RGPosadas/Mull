import { Test, TestingModule } from '@nestjs/testing';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';
import { CreateEventInput, UpdateEventInput } from './inputs/event.input';
import { mockPartialEvent, mockAllEvents } from './event.mockdata';
import { User } from '../entities';

const mockEventService = () => ({
  create: jest.fn((mockEventData: CreateEventInput) => ({ ...mockEventData })),
  findOne: jest.fn((id: number) => mockAllEvents.find((event) => event.id === id)),
  findAll: jest.fn(() => mockAllEvents),
  update: jest.fn((mockEventData: UpdateEventInput) => ({ ...mockEventData })),
  delete: jest.fn((id: number) => mockAllEvents.find((event) => event.id === id)),
  addParticipant: jest.fn((eventId: number, userId: number) => {
    const event = mockAllEvents.find((event) => (event.id = eventId));
    event.participants.push(new User(userId));
    return event;
  }),
});

describe('UserResolver', () => {
  let resolver: EventResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventResolver,
        {
          provide: EventService,
          useFactory: mockEventService,
        },
      ],
    }).compile();

    resolver = module.get<EventResolver>(EventResolver);
  });

  it('should create event', async () => {
    const returnedEvent = await resolver.createEvent(mockPartialEvent as CreateEventInput);
    expect(returnedEvent).toEqual(mockPartialEvent);
  });

  it('should fetch all events', async () => {
    const returnedEvents = await resolver.events();
    expect(returnedEvents).toEqual(mockAllEvents);
  });

  it('should update the event', async () => {
    const updatedEvent = await resolver.updateEvent(mockPartialEvent as UpdateEventInput);
    expect(updatedEvent).toEqual(mockPartialEvent);
  });

  it('should return the deleted event', async () => {
    const deletedEvent = await resolver.deleteEvent(35);
    expect(deletedEvent).toEqual(mockAllEvents.find((event) => event.id === 35));
  });

  it('should add the participant to the event', async () => {
    const success = await resolver.addParticipantToEvent(35, 1);
    expect(success).toEqual(true);
  });

  it('should return the event with given id', async () => {
    const foundEvent = await resolver.event(35);
    expect(foundEvent).toEqual(mockAllEvents.find((event) => event.id === 35));
  });
});
