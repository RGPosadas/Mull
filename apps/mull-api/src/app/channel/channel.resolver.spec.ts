import { Test, TestingModule } from '@nestjs/testing';
import { mockAllUsers } from '../user/user.mockdata';
import { MockType } from '../user/user.service.spec';
import {
  mockAllChannels,
  mockAllDirectMessageChannels,
  mockAllEventChannels,
} from './channel.mockdata';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';
import { CreateEventChannelInput } from './inputs/channel.input';

const mockChannelService = () => ({
  getChannel: jest.fn((channelId: number) => {
    return mockAllChannels.find((channel) => channel.id === channelId);
  }),
  getChannelByEventId: jest.fn((eventId, channelName, userId) => {
    return mockAllEventChannels.find(
      (channel) =>
        channel.event.id === eventId &&
        channel.name === channelName &&
        channel.event.host.id === userId
    );
  }),
  getDmChannel: jest.fn((channelId: number) => {
    return mockAllDirectMessageChannels.find((channel) => channel.id === channelId);
  }),
  createEventChannel: jest.fn((mockEventChannelData: CreateEventChannelInput) => ({
    ...mockEventChannelData,
  })),
  createDmChannel: jest.fn().mockReturnValue(mockAllDirectMessageChannels[0]),
  deleteChannel: jest.fn((channelId: number) =>
    mockAllChannels.find((channel) => channel.id === channelId)
  ),
  findDirectMessageChannelByUserIds: jest.fn(),
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

  it('should get a channel by event id', async () => {
    const getChannel = await resolver.getChannelByEventId(
      mockAllEventChannels[2].event.id,
      'Announcements',
      mockAllEventChannels[2].event.host.id
    );
    expect(getChannel).toBe(mockAllEventChannels[2]);
  });

  it('should get a direct message channel', async () => {
    service.findDirectMessageChannelByUserIds.mockReturnValue(mockAllDirectMessageChannels[0]);
    const directMessageChannel = await resolver.getDmChannel(
      mockAllUsers[0].id,
      mockAllUsers[1].id
    );
    expect(directMessageChannel).toBe(mockAllDirectMessageChannels[0]);
  });

  it('should not get a direct message channel', async () => {
    service.findDirectMessageChannelByUserIds.mockReturnValue(null);
    const directMessageChannel = await resolver.getDmChannel(
      mockAllUsers[0].id,
      mockAllUsers[2].id
    );
    expect(directMessageChannel).toBe(null);
  });

  it('should create a direct message channel', async () => {
    const createdDmChannel = await resolver.createDmChannel(mockAllUsers[0].id, mockAllUsers[1].id);
    expect(createdDmChannel).toBe(mockAllDirectMessageChannels[0]);
  });

  it('should delete a channel', async () => {
    const deletedChannel = await resolver.deleteChannel(mockAllChannels[0].id);
    expect(deletedChannel).toBeTruthy();
  });
});
