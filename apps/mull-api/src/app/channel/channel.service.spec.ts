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
  mockCreateChannel,
  mockCreateDmChannel,
  mockCreateEventChannel,
} from './channel.mockdata';
import { ChannelService } from './channel.service';
import { CreateDmChannelInput, CreateEventChannelInput } from './inputs/channel.input';

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
  save: jest.fn((mockChannelData: CreateEventChannelInput) => ({ ...mockChannelData })),
});

const mockDmChannelRepository = () => ({
  findOne: jest.fn((channelId: number) => {
    return mockAllDirectMessageChannels.find((channel) => channel.id === channelId);
  }),
  save: jest.fn((mockChannelData: CreateDmChannelInput) => ({ ...mockChannelData })),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  })),
});

describe('ChannelService', () => {
  let service: ChannelService;
  let repository: MockType<Repository<Channel>>;
  let dmRepository: MockType<Repository<DirectMessageChannel>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelService,
        { provide: getRepositoryToken(Channel), useFactory: mockChannelRepository },
        { provide: getRepositoryToken(EventChannel), useFactory: mockEventChannelRepository },
        { provide: getRepositoryToken(DirectMessageChannel), useFactory: mockDmChannelRepository },
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
    repository = module.get(getRepositoryToken(Channel));
    dmRepository = module.get(getRepositoryToken(DirectMessageChannel));
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
    const returnedDmChannel = await service.getDmChannel(mockAllDirectMessageChannels[0].id);
    expect(returnedDmChannel).toBe(mockAllDirectMessageChannels[0]);
  });

  it('should create an event channel', async () => {
    const createdEventChannel = await service.createEventChannel(mockCreateEventChannel, 1);
    expect(createdEventChannel).toBeTruthy();
  });

  it('should create a DM channel', async () => {
    const createdDmChannel = await service.createDmChannel(mockCreateDmChannel);
    expect(createdDmChannel).toBeTruthy();
  });

  it('should delete all types of channels', async () => {
    const deletedChannel = await service.deleteChannel(mockAllChannels[0].id);
    expect(deletedChannel).toBeTruthy();

    const deletedEventChannel = await service.deleteChannel(mockAllEventChannels[0].id);
    expect(deletedEventChannel).toBeTruthy();

    const deletedDmChannel = await service.deleteChannel(mockAllDirectMessageChannels[0].id);
    expect(deletedDmChannel).toBeTruthy();
  });

  it('should get a announcement channel by event id', async () => {
    const testChannel = mockAllChannels[2];
    repository.findOne.mockImplementation(() => {
      return mockAllChannels.find((channel) => {
        return (
          channel.event.id === testChannel.event.id &&
          channel.name === testChannel.name &&
          (channel.event.host.id === testChannel.event.host.id ||
            channel.event.coHosts === testChannel.event.coHosts ||
            channel.participants === testChannel.participants)
        );
      });
    });
    const getChannel = await service.getChannelByEvent(
      testChannel.event.id,
      'Announcements',
      testChannel.event.host.id
    );
    const getChannelByCoHost = await service.getChannelByEvent(
      testChannel.event.id,
      'Announcements',
      testChannel.event.coHosts[0].id
    );
    expect(getChannel).toBe(testChannel);
    expect(getChannelByCoHost).toBe(testChannel);
  });

  it('should get a group chat channel by event id with host', async () => {
    const testChannel = mockAllChannels[1];
    repository.findOne.mockImplementation(() => {
      return mockAllChannels.find((channel) => {
        return (
          channel.event.id === testChannel.event.id &&
          channel.name === testChannel.name &&
          (channel.event.host.id === testChannel.event.host.id ||
            channel.event.coHosts === testChannel.event.coHosts ||
            channel.event.participants === testChannel.event.participants)
        );
      });
    });
    const getChannelWithHost = await service.getChannelByEvent(
      testChannel.event.id,
      'Group Chat',
      testChannel.event.host.id
    );
    const getChannelWithCoHost = await service.getChannelByEvent(
      testChannel.event.id,
      'Group Chat',
      testChannel.event.coHosts[0].id
    );
    expect(getChannelWithHost).toBe(testChannel);
    expect(getChannelWithCoHost).toBe(testChannel);
  });

  it('should get a group chat channel by event id with participant', async () => {
    const testChannel = mockAllChannels[1];
    repository.findOne.mockImplementation(() => {
      return mockAllChannels.find((channel) => {
        return (
          channel.event.id === testChannel.event.id &&
          channel.name === testChannel.name &&
          channel.event.participants === testChannel.event.participants
        );
      });
    });
    const getChannelWithParticipant = await service.getChannelByEvent(
      testChannel.event.id,
      'Group Chat',
      testChannel.event.participants[0].id
    );
    expect(getChannelWithParticipant).toBe(testChannel);
  });

  it('should throw exception when getting an unauthorized channel', async () => {
    const testChannel = mockAllChannels[0];
    repository.findOne.mockImplementation(() => {
      return mockAllChannels.find((channel) => {
        return (
          channel.event.id === testChannel.event.id &&
          channel.name === testChannel.name &&
          (channel.event.host.id === testChannel.event.host.id ||
            channel.event.coHosts === testChannel.event.coHosts ||
            channel.participants === testChannel.participants)
        );
      });
    });
    expect(() =>
      service.getChannelByEvent(testChannel.event.id, testChannel.name, -100)
    ).rejects.toThrow('Unauthorized');
  });

  it('should create a channel', async () => {
    const createChannel = await service.createChannel(mockCreateChannel);
    expect(createChannel).toBeTruthy();
  });

  it('should find the users in a DM channel', async () => {
    dmRepository.createQueryBuilder.mockReturnValue({
      where: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValue(mockAllDirectMessageChannels),
    });
    const foundDmChannel = await service.findUsersInDmChannel(
      mockAllUsers[0].id,
      mockAllUsers[1].id
    );
    expect(foundDmChannel).toBe(mockAllDirectMessageChannels[0]);
  });

  it('should not find the users in a DM channel', async () => {
    dmRepository.createQueryBuilder.mockReturnValue({
      where: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValue([]),
    });
    const foundDmChannel = await service.findUsersInDmChannel(
      mockAllUsers[0].id,
      mockAllUsers[2].id
    );
    expect(foundDmChannel).toBeUndefined();
  });
});
