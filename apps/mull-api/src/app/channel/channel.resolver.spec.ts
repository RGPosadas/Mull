import { Test, TestingModule } from '@nestjs/testing';
import { mockAllChannels, mockCreateChannel } from './channel.mockdata';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';
import { CreateChannelInput } from './inputs/channel.input';

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
  deleteChannel: jest.fn((channelId: number) =>
    mockAllChannels.find((channel) => channel.id === channelId)
  ),
});
describe('ChannelResolver', () => {
  let resolver: ChannelResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelResolver, { provide: ChannelService, useFactory: mockChannelService }],
    }).compile();

    resolver = module.get<ChannelResolver>(ChannelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get a channel', async () => {
    const getChannel = await resolver.getChannel(mockAllChannels[0].id);
    expect(getChannel).toBe(mockAllChannels[0]);
  });

  it('should get a channel by event id', async () => {
    const getChannel = await resolver.getChannelByEvent(
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

  it('should delete a channel', async () => {
    const deleteChannel = await resolver.deleteChannel(mockAllChannels[0].id);
    expect(deleteChannel).toBeTruthy();
  });
});
