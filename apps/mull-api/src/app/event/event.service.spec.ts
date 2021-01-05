import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities';
import { mockAllUsers } from '../user/user.mockdata';
import { mockAllEvents, mockPartialEvent } from './event.mockdata';
import { EventService } from './event.service';
import { CreateEventInput } from './inputs/event.input';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

const mockEventRepositoy = () => ({
  create: jest.fn((mockUserData: CreateEventInput) => ({ ...mockUserData })),
  findOne: jest.fn((id: number) => {
    return mockAllEvents.find((event) => event.id === id);
  }),
  find: jest.fn(() => mockAllEvents),
  update: jest.fn((id: number) => mockAllEvents.find((event) => event.id === id)),
  delete: jest.fn((id: number) => mockAllEvents.find((event) => event.id === id)),
  save: jest.fn((event: Event) => event),
  createQueryBuilder: jest.fn(() => ({
    leftJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnValue(mockAllEvents[0]),
  })),
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
          useFactory: mockEventRepositoy,
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
    const returnedEvent = await service.create(mockPartialEvent as CreateEventInput);
    expect(returnedEvent).toEqual(mockPartialEvent);
  });

  it('should fetch all events', async () => {
    const returnedEvents = await service.findAll();
    expect(returnedEvents).toEqual(mockAllEvents);
  });

  it('should update the event', async () => {
    const updatedEvent = await service.update(mockAllEvents[0]);
    expect(updatedEvent).toEqual(mockAllEvents[0]);
  });

  it('should return the deleted event', async () => {
    const deletedEvent = await service.delete(35);
    expect(deletedEvent).toEqual(mockAllEvents.find((event) => event.id === 35));
  });

  it('should add the participant to the event', async () => {
    const eventId = 35;
    const userId = 1;
    const event = await service.findOne(eventId);
    const oldSize = event.participants.length;

    const updatedEvent = await service.addParticipant(eventId, userId);
    expect(updatedEvent.participants.length).toBeGreaterThan(oldSize);
    expect(updatedEvent.participants.pop().id).toEqual(userId);
  });

  it('should return the event with given id', async () => {
    const foundEvent = await service.findOne(35);
    expect(foundEvent).toEqual(mockAllEvents.find((event) => event.id === 35));
  });

  it('should return a list of events that belongs to a host', async () => {
    const hostId = mockAllUsers[1].id;
    repository.find.mockReturnValue(mockAllEvents.find((event) => event.host.id === hostId));
    const foundEvent = await service.findHostEvents(hostId);
    expect(foundEvent).toEqual(mockAllEvents.find((event) => event.host.id === hostId));
    expect(repository.find).toBeCalledTimes(1);
  });

  it('should return a list of events that belongs to a co-host', async () => {
    const coHostId = mockAllUsers[1].id;
    repository.createQueryBuilder.mockImplementation(() => ({
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest
        .fn()
        .mockReturnValue(
          mockAllEvents.find((event) => event.coHosts.some((cohost) => cohost.id === coHostId))
        ),
    }));
    const foundEvent = await service.findCoHostEvents(coHostId);
    expect(foundEvent).toEqual(
      mockAllEvents.find((event) => event.coHosts.some((cohost) => cohost.id === coHostId))
    );
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it('should return a list of events that a user has joined', async () => {
    const userId = mockAllUsers[2].id;
    repository.createQueryBuilder.mockImplementation(() => ({
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest
        .fn()
        .mockReturnValue(
          mockAllEvents.find((event) =>
            event.participants.some((participant) => participant.id === userId)
          )
        ),
    }));
    const foundEvents = await service.findJoinedEvents(userId);
    expect(foundEvents).toEqual(
      mockAllEvents.find((event) =>
        event.participants.some((participant) => participant.id === userId)
      )
    );
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it('should return all the events a user is not involved in', async () => {
    const userId = mockAllUsers[2].id;
    repository.createQueryBuilder.mockImplementation(() => ({
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValue(mockAllEvents[2]),
    }));
    const foundEvents = await service.findDiscoverEvent(userId);
    expect(foundEvents).toEqual(mockAllEvents[2]);
    expect(repository.createQueryBuilder).toBeCalledTimes(1);
  });
});
