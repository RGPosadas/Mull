import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities';
import { mockAllUsers } from '../user/user.mockdata';
import { mockAllEvents, mockImage, mockPartialEvent } from './event.mockdata';
import { EventResolver } from './event.resolver';
import { DEFAULT_EVENT_CHANNELS, EventService } from './event.service';
import { CreateEventInput, UpdateEventInput } from './inputs/event.input';

const mockEventService = () => ({
  createEvent: jest.fn((hostId: number, mockEventData: CreateEventInput) => ({
    ...mockEventData,
    hostId: { id: hostId },
    channels: DEFAULT_EVENT_CHANNELS,
  })),
  getEvent: jest.fn((id: number) => mockAllEvents.find((event) => event.id === id)),
  getAllEvents: jest.fn(() => mockAllEvents),
  updateEvent: jest.fn((mockEventData: UpdateEventInput) => ({ ...mockEventData })),
  deleteEvent: jest.fn((id: number) => mockAllEvents.find((event) => event.id === id)),
  addEventParticipant: jest.fn((eventId: number, userId: number) => {
    const event = mockAllEvents.find((event) => (event.id = eventId));
    event.participants.push(new User(userId));
    return event;
  }),
  removeEventParticipant: jest.fn((eventId: number, userId: number) => {
    const event = mockAllEvents.find((event) => (event.id = eventId));
    const user = event.participants.find((participant) => participant.id == userId);
    const index = event.participants.indexOf(user);
    event.participants.splice(index, 1);
    return event;
  }),
  getEventsHostedByUser: jest.fn((id: number) =>
    mockAllEvents.find((event) => event.host.id === id)
  ),
  getEventsCoHostedByUser: jest.fn((coHostId: number) =>
    mockAllEvents.find((event) => event.coHosts.some((cohost) => cohost.id === coHostId))
  ),
  getEventsAttendedByUser: jest.fn((participantId: number) =>
    mockAllEvents.find((event) =>
      event.participants.some((participant) => participant.id === participantId)
    )
  ),
  getEventsRecommendedToUser: jest.fn().mockReturnValue(mockAllEvents[2]),
  getEventImage: jest.fn().mockReturnValue(mockImage),
  getUserEventsPortfolio: jest.fn((id: number) => {
    const currentDateTime = new Date();
    return mockAllEvents.find((event) => event.host.id === id && event.endDate < currentDateTime);
  }),
});

describe('UserResolver', () => {
  let resolver: EventResolver;
  let service: EventService;
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
    service = module.get<EventService>(EventService);
  });

  it('should create event', async () => {
    const returnedEvent = await resolver.createEvent(5, mockPartialEvent as CreateEventInput);
    expect(returnedEvent).toEqual({
      ...mockPartialEvent,
      hostId: { id: 5 },
      channels: DEFAULT_EVENT_CHANNELS,
    });
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
    const success = await resolver.joinEvent(35, 1);
    expect(success).toEqual(true);
  });

  it('should remove the participant from the event', async () => {
    const success = await resolver.leaveEvent(35, 1);
    expect(success).toEqual(true);
  });

  it('should return the event with given id', async () => {
    const foundEvent = await resolver.event(35);
    expect(foundEvent).toEqual(mockAllEvents.find((event) => event.id === 35));
  });

  it('should return a list of events that belongs to a co-host', async () => {
    const coHostId = mockAllUsers[0].id;
    const foundEvents = await resolver.coHostEvents(coHostId);
    expect(foundEvents).toEqual(
      mockAllEvents.find((event) => event.coHosts.some((cohost) => cohost.id === coHostId))
    );
    expect(service.getEventsCoHostedByUser).toBeCalledTimes(1);
  });

  it('should return a list of events that belongs to a host', async () => {
    const hostId = mockAllUsers[0].id;
    const foundEvents = await resolver.hostEvents(hostId);
    expect(foundEvents).toEqual(mockAllEvents.find((event) => event.host.id === hostId));
    expect(service.getEventsHostedByUser).toBeCalledTimes(1);
  });

  it('should return a list of events that a user has joined', async () => {
    const participantId = mockAllUsers[2].id;
    const foundEvents = await resolver.participantEvents(participantId);
    expect(foundEvents).toEqual(
      mockAllEvents.find((event) =>
        event.participants.some((participant) => participant.id === participantId)
      )
    );
    expect(service.getEventsAttendedByUser).toBeCalledTimes(1);
  });

  it('should return a list of events that the user is not involved with', async () => {
    const id = mockAllUsers[2].id;
    const foundEvents = await resolver.discoverEvents(id);
    expect(foundEvents).toEqual(mockAllEvents[2]);
    expect(service.getEventsRecommendedToUser).toBeCalledTimes(1);
  });

  it('should return an image', async () => {
    const image = await resolver.image(mockAllEvents[0]);
    expect(image).toEqual(mockImage);
  });

  it(`should get a user's portfolio`, async () => {
    const userPortfolio = await resolver.portfolioEvents(mockAllEvents[0].host.id);
    expect(userPortfolio).toEqual(mockAllEvents[0]);
  });
});
