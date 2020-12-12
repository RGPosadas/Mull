import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { Event } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateEventInput } from './inputs/event.input';
import { mockAllEvents, mockPartialEvent } from './event.mockdata';

const mockEventRepositoy = () => ({
  create: jest.fn((mockUserData: CreateEventInput) => ({ ...mockUserData })),
  findOne: jest.fn((id: number) => {
    return mockAllEvents.find((event) => event.id === id);
  }),
  find: jest.fn(() => mockAllEvents),
  update: jest.fn((id: number) => mockAllEvents.find((event) => event.id === id)),
  delete: jest.fn((id: number) => mockAllEvents.find((event) => event.id === id)),
  save: jest.fn((event: Event) => event),
});

describe('EventService', () => {
  let service: EventService;

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
    const event = await service.addParticipant(35, 1);
    expect(event.participants[0].id).toEqual(1);
  });

  it('should return the event with given id', async () => {
    const foundEvent = await service.findOne(35);
    expect(foundEvent).toEqual(mockAllEvents.find((event) => event.id === 35));
  });

  describe('InnerEventService', () => {
    let innerService: EventService;

    const notAnonymousFunction = () => ({
      find: jest.fn((userId) =>
        mockAllEvents.find((event) => {
          return event.host.id === userId.where.host.id;
        })
      ),
    });

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          EventService,
          {
            provide: getRepositoryToken(Event),
            useFactory: notAnonymousFunction,
          },
        ],
      }).compile();

      innerService = module.get<EventService>(EventService);
    });

    it('should return a list of events that belongs to a host given an id', async () => {
      const foundEvent = await innerService.findHostEvents(7);
      expect(foundEvent).toEqual(mockAllEvents.find((event) => event.host.id === 7));
    });
  });
});
