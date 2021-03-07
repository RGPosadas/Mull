import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel, DirectMessageChannel, EventChannel } from '../entities';
import { mockAllUsers } from '../user/user.mockdata';
import { MockType } from '../user/user.service.spec';
import {
  mockAllChannels,
  mockAllDirectMessageChannels,
  mockAllEventChannels,
} from './channel.mockdata';
import { ChannelService } from './channel.service';
import { CreateEventChannelInput } from './inputs/channel.input';

const mockChannelRepository = () => ({
  findOne: jest.fn((channelId: number) => {
    return mockAllChannels.find((channel) => channel.id === channelId);
  }),
  delete: jest.fn((channelId: number) =>
    mockAllChannels.find((channel) => channel.id === channelId)
  ),
});

const mockEventChannelRepository = () => ({
  findOne: jest.fn((channelId: number) => {
    return mockAllEventChannels.find((channel) => channel.id === channelId);
  }),
  save: jest.fn((mockEventChannelData: CreateEventChannelInput) => ({ ...mockEventChannelData })),
});

const mockDirectMessageChannelRepository = () => ({
  findOne: jest.fn((channelId: number) => {
    return mockAllDirectMessageChannels.find((channel) => channel.id === channelId);
  }),
  save: jest.fn((mockDirectMessageChannelData: DirectMessageChannel) => ({
    ...mockDirectMessageChannelData,
  })),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  })),
});

describe('ChannelService', () => {
  let service: ChannelService;
  let directMessageRepository: MockType<Repository<DirectMessageChannel>>;
  let eventRepository: MockType<Repository<EventChannel>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelService,
        { provide: getRepositoryToken(Channel), useFactory: mockChannelRepository },
        { provide: getRepositoryToken(EventChannel), useFactory: mockEventChannelRepository },
        {
          provide: getRepositoryToken(DirectMessageChannel),
          useFactory: mockDirectMessageChannelRepository,
        },
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
    directMessageRepository = module.get(getRepositoryToken(DirectMessageChannel));
    eventRepository = module.get(getRepositoryToken(EventChannel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a generic channel', async () => {
    const returnedChannel = await service.getChannel(mockAllChannels[0].id);
    expect(returnedChannel).toBe(mockAllChannels[0]);
  });

  it('should get an event channel', async () => {
    const returnedEventChannel = await service.getEventChannel(mockAllEventChannels[0].id);
    expect(returnedEventChannel).toBe(mockAllEventChannels[0]);
  });

  it('should get a direct message channel', async () => {
    const returnedDirectMessageChannel = await service.getDirectMessageChannel(
      mockAllDirectMessageChannels[0].id,
      mockAllUsers[0].id
    );
    expect(returnedDirectMessageChannel).toBe(mockAllDirectMessageChannels[0]);
  });

  it('should create a DM channel', async () => {
    const createdDirectMessageChannel = await service.createDirectMessageChannel(
      mockAllUsers[0].id,
      mockAllUsers[1].id
    );
    expect(createdDirectMessageChannel).toBeTruthy();
  });

  it('should delete all types of channels', async () => {
    const deletedChannel = await service.deleteChannel(mockAllChannels[0].id);
    expect(deletedChannel).toBeTruthy();

    const deletedEventChannel = await service.deleteChannel(mockAllEventChannels[0].id);
    expect(deletedEventChannel).toBeTruthy();

    const deletedDirectMessageChannel = await service.deleteChannel(
      mockAllDirectMessageChannels[0].id
    );
    expect(deletedDirectMessageChannel).toBeTruthy();
  });

  it('should get an announcement channel by event id', async () => {
    const testChannel = mockAllEventChannels[2];
    eventRepository.findOne.mockImplementation(() => {
      return mockAllEventChannels.find((channel) => {
        return (
          channel.event.id === testChannel.event.id &&
          channel.name === testChannel.name &&
          (channel.event.host.id === testChannel.event.host.id ||
            channel.event.coHosts === testChannel.event.coHosts)
        );
      });
    });
    const getChannel = await service.getChannelByEventId(
      testChannel.event.id,
      'Announcements',
      testChannel.event.host.id
    );
    const getChannelByCoHost = await service.getChannelByEventId(
      testChannel.event.id,
      'Announcements',
      testChannel.event.coHosts[0].id
    );
    expect(getChannel).toBe(testChannel);
    expect(getChannelByCoHost).toBe(testChannel);
  });

  it('should get a group chat channel by event id with host', async () => {
    const testChannel = mockAllEventChannels[1];
    eventRepository.findOne.mockImplementation(() => {
      return mockAllEventChannels.find((channel) => {
        return (
          channel.event.id === testChannel.event.id &&
          channel.name === testChannel.name &&
          (channel.event.host.id === testChannel.event.host.id ||
            channel.event.coHosts === testChannel.event.coHosts ||
            channel.event.participants === testChannel.event.participants)
        );
      });
    });
    const getChannelWithHost = await service.getChannelByEventId(
      testChannel.event.id,
      'Group Chat',
      testChannel.event.host.id
    );
    const getChannelWithCoHost = await service.getChannelByEventId(
      testChannel.event.id,
      'Group Chat',
      testChannel.event.coHosts[0].id
    );
    expect(getChannelWithHost).toBe(testChannel);
    expect(getChannelWithCoHost).toBe(testChannel);
  });

  it('should get a group chat channel by event id with participant', async () => {
    const testChannel = mockAllEventChannels[1];
    eventRepository.findOne.mockImplementation(() => {
      return mockAllEventChannels.find((channel) => {
        return (
          channel.event.id === testChannel.event.id &&
          channel.name === testChannel.name &&
          channel.event.participants === testChannel.event.participants
        );
      });
    });
    const getChannelWithParticipant = await service.getChannelByEventId(
      testChannel.event.id,
      'Group Chat',
      testChannel.event.participants[0].id
    );
    expect(getChannelWithParticipant).toBe(testChannel);
  });

  it('should throw exception when getting an unauthorized event channel', async () => {
    const testChannel = mockAllEventChannels[0];
    eventRepository.findOne.mockImplementation(() => {
      return mockAllEventChannels.find((channel) => {
        return (
          channel.event.id === testChannel.event.id &&
          channel.name === testChannel.name &&
          (channel.event.host.id === testChannel.event.host.id ||
            channel.event.coHosts === testChannel.event.coHosts)
        );
      });
    });
    expect(
      async () => await service.getChannelByEventId(testChannel.event.id, testChannel.name, -100)
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw exception when getting an unauthorized directMessage channel', async () => {
    const testChannel = mockAllDirectMessageChannels[0];
    expect(async () => await service.getDirectMessageChannel(testChannel.id, -100)).rejects.toThrow(
      UnauthorizedException
    );
  });

  it('should find the users in a DM channel', async () => {
    directMessageRepository.createQueryBuilder.mockReturnValue({
      where: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValue(mockAllDirectMessageChannels),
    });
    const foundDirectMessageChannel = await service.findDirectMessageChannelByUserIds(
      mockAllUsers[0].id,
      mockAllUsers[1].id
    );
    expect(foundDirectMessageChannel).toBe(mockAllDirectMessageChannels[0]);
  });

  it('should not find the users in a DM channel', async () => {
    directMessageRepository.createQueryBuilder.mockReturnValue({
      where: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValue([]),
    });
    const foundDirectMessageChannel = await service.findDirectMessageChannelByUserIds(
      mockAllUsers[0].id,
      mockAllUsers[2].id
    );
    expect(foundDirectMessageChannel).toBeUndefined();
  });
});
