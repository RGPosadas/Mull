import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities';
import { mockAllUsers } from '../user/user.mockdata';
import { MockType } from '../user/user.service.spec';
import { mockAllEvents, mockPartialEvent } from './event.mockdata';
import { DEFAULT_EVENT_CHANNELS, EventService } from './event.service';
import { CreateEventInput } from './inputs/event.input';

const mockEventRepository = () => ({
  create: jest.fn((mockUserData: CreateEventInput) => ({ ...mockUserData })),
  findOne: jest.fn((id: number) => {
    return mockAllEvents.find((event) => event.id === id);
  }),
  find: jest.fn(() => mockAllEvents),
  update: jest.fn((id: number) => mockAllEvents.find((event) => event.id === id)),
  delete: jest.fn((id: number) => mockAllEvents.find((event) => event.id === id)),
  save: jest.fn((event: Event) => event),
  createQueryBuilder: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    distinct: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    setParameter: jest.fn().mockReturnThis(),
    setParameters: jest.fn().mockReturnThis(),
    getQuery: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnValue(mockAllEvents[0]),
  })),
  query: jest.fn().mockReturnThis(),
});

describe('EventService', () => {
  let service: EventService;
  let repository: MockType<Repository<Event>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(Event),
          useFactory: mockEventRepository,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    repository = module.get(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create the event', async () => {
    const hostId = 5;
    const returnedEvent = await service.createEvent(hostId, mockPartialEvent as CreateEventInput);
    expect(returnedEvent).toEqual({
      ...mockPartialEvent,
      host: { id: hostId },
      channels: DEFAULT_EVENT_CHANNELS,
    });
  });

  it('should fetch all events', async () => {
    const returnedEvents = await service.getAllEvents();
    expect(returnedEvents).toEqual(mockAllEvents);
  });

  it('should update the event', async () => {
    const updatedEvent = await service.updateEvent(mockAllEvents[0]);
    expect(updatedEvent).toEqual(mockAllEvents[0]);
  });

  it('should return the deleted event', async () => {
    const deletedEvent = await service.deleteEvent(35);
    expect(deletedEvent).toEqual(mockAllEvents.find((event) => event.id === 35));
  });

  it('should add the participant to the event', async () => {
    const eventId = 35;
    const userId = 1;
    const event = await service.getEvent(eventId);
    const oldSize = event.participants.length;

    const updatedEvent = await service.addEventParticipant(eventId, userId);
    expect(updatedEvent.participants.length).toBeGreaterThan(oldSize);
    expect(updatedEvent.participants.pop().id).toEqual(userId);
  });

  it('should remove the participant from the event', async () => {
    const eventId = 35;
    const userId = 3;
    const event = await service.getEvent(eventId);
    const oldSize = event.participants.length;

    const updatedEvent = await service.removeEventParticipant(eventId, userId);
    expect(updatedEvent.participants.length).toBeLessThan(oldSize);
  });

  it('should throw an error if user is not a participant of the event', async () => {
    const eventId = 35;
    const userId = 150;
    try {
      await service.removeEventParticipant(eventId, userId);
    } catch (error) {
      expect(error).toEqual(new Error('User is not a participant of the event'));
    }
  });

  it('should return the event with given id', async () => {
    const foundEvent = await service.getEvent(35);
    expect(foundEvent).toEqual(mockAllEvents.find((event) => event.id === 35));
  });

  it('should return a list of events that belongs to a host', async () => {
    const hostId = mockAllUsers[1].id;
    repository.createQueryBuilder.mockImplementation(() => ({
      leftJoin: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      setParameters: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValue(mockAllEvents.find((event) => event.host.id === hostId)),
    }));
    const foundEvent = await service.getEventsHostedByUser(hostId);
    console.log(foundEvent);
    expect(foundEvent).toEqual(mockAllEvents.find((event) => event.host.id === hostId));
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it('should return a list of events that belongs to a co-host', async () => {
    const coHostId = mockAllUsers[1].id;
    repository.createQueryBuilder.mockImplementation(() => ({
      leftJoin: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest
        .fn()
        .mockReturnValue(
          mockAllEvents.find((event) => event.coHosts.some((cohost) => cohost.id === coHostId))
        ),
    }));
    const foundEvent = await service.getEventsCoHostedByUser(coHostId);
    expect(foundEvent).toEqual(
      mockAllEvents.find((event) => event.coHosts.some((cohost) => cohost.id === coHostId))
    );
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it('should return a list of events that a user has joined', async () => {
    const userId = mockAllUsers[2].id;
    repository.createQueryBuilder.mockImplementation(() => ({
      leftJoin: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest
        .fn()
        .mockReturnValue(
          mockAllEvents.find((event) =>
            event.participants.some((participant) => participant.id === userId)
          )
        ),
    }));
    const foundEvents = await service.getEventsAttendedByUser(userId);
    expect(foundEvents).toEqual(
      mockAllEvents.find((event) =>
        event.participants.some((participant) => participant.id === userId)
      )
    );
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it('should check if a user joined an event', async () => {
    const participantId = mockAllUsers[2].id;
    const eventId = mockAllEvents[0].id;
    repository.createQueryBuilder.mockImplementation(() => ({
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnValue(mockAllEvents[0]),
    }));
    const foundEvent = await service.isUserAttendingEvent(eventId, participantId);
    expect(foundEvent).toEqual(true);
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it('should return all the events a user is not involved in', async () => {
    const userId = mockAllUsers[2].id;
    const foundEvents = await service.getEventsRecommendedToUser(userId);
    expect(foundEvents).toEqual(mockAllEvents[0]);
    expect(repository.createQueryBuilder).toBeCalled();
  });

  it('should get an image', async () => {
    const image = await service.getEventImage(36);
    expect(image).toEqual(mockAllEvents[1].image);
  });

  it(`should return a user's portfolio`, async () => {
    const portfolio = await service.getUserEventsPortfolio(mockAllEvents[0].host.id);
    expect(portfolio).toEqual(mockAllEvents[0]);
  });
});
