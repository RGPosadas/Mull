import { Test, TestingModule } from '@nestjs/testing';
import { mockAllUsers } from '../user/user.mockdata';
import { MockType } from '../user/user.service.spec';
import {
  mockAllChannels,
  mockAllDirectMessageChannels,
  mockCreateDmChannel,
  mockCreateEventChannel,
} from './channel.mockdata';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';

const mockChannelService = () => ({
  getChannel: jest.fn((channelId: number) => {
    return mockAllChannels.find((channel) => channel.id === channelId);
  }),
  getChannelByEvent: jest.fn((eventId, channelName, userId) => {
    return mockAllChannels.find(
      (channel) =>
        channel.event.id === eventId &&
        channel.name === channelName &&
        channel.event.host.id === userId
    );
  }),
  createChannel: jest.fn((mockChannelData: CreateChannelInput) => ({ ...mockChannelData })),
  getEventChannel: jest.fn((channelId: number) => {
    return mockAllEventChannels.find((channel) => channel.id === channelId);
  }),
  getDmChannel: jest.fn((channelId: number) => {
    return mockAllDirectMessageChannels.find((channel) => channel.id === channelId);
  }),
  createEventChannel: jest.fn((mockEventChannelData: CreateEventChannelInput) => ({
    ...mockEventChannelData,
  })),
  createDmChannel: jest.fn((mockChannelData: CreateDmChannelInput) => ({ ...mockChannelData })),
  deleteChannel: jest.fn((channelId: number) =>
    mockAllChannels.find((channel) => channel.id === channelId)
  ),
  findUsersInDmChannel: jest.fn(),
});

describe('ChannelResolver', () => {
  let resolver: ChannelResolver;
  let service: MockType<ChannelService>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelResolver, { provide: ChannelService, useFactory: mockChannelService }],
    }).compile();

    resolver = module.get<ChannelResolver>(ChannelResolver);
    service = module.get(ChannelService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get a generic channel', async () => {
    const getChannel = await resolver.getChannel(mockAllChannels[0].id);
    expect(getChannel).toBe(mockAllChannels[0]);
  });

  it('should get a channel by event id', async () => {
    const getChannel = await resolver.getEventChannel(
      mockAllChannels[2].event.id,
      'Announcements',
      mockAllChannels[2].event.host.id
    );
    expect(getChannel).toBe(mockAllChannels[2]);
  });

  it('should create a channel', async () => {
    const createChannel = await resolver.createChannel(mockCreateChannel);
    expect(createChannel).toBeTruthy();
  });

  it('should get a direct message channel', async () => {
    service.findUsersInDmChannel.mockReturnValue(mockAllDirectMessageChannels[0]);
    const directMessageChannel = await resolver.getDmChannel([mockAllUsers[0], mockAllUsers[1]]);
    expect(directMessageChannel).toBe(mockAllDirectMessageChannels[0]);
  });

  it('should not get a direct message channel', async () => {
    service.findUsersInDmChannel.mockReturnValue(null);
    const directMessageChannel = await resolver.getDmChannel([mockAllUsers[0], mockAllUsers[2]]);
    expect(directMessageChannel).toBe(null);
  });

  it('should create an event channel', async () => {
    const createdEventChannel = await resolver.createEventChannel(mockCreateEventChannel);
    expect(createdEventChannel).toBeTruthy();
  });

  it('should create a direct message channel', async () => {
    const createdDmChannel = await resolver.createDmChannel(mockCreateDmChannel);
    expect(createdDmChannel).toBeTruthy();
  });

  it('should delete a channel', async () => {
    const deletedChannel = await resolver.deleteChannel(mockAllChannels[0].id);
    expect(deletedChannel).toBeTruthy();
  });
});
