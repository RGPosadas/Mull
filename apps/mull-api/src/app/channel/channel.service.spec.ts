import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from '../entities';
import { MockType } from '../user/user.service.spec';
import { mockAllChannels, mockCreateChannel } from './channel.mockdata';
import { ChannelService } from './channel.service';
import { CreateChannelInput } from './inputs/channel.input';

const mockChannelRepository = () => ({
  findOne: jest.fn((channelId: number) => {
    return mockAllChannels.find((channel) => channel.id === channelId);
  }),
  save: jest.fn((mockChannelData: CreateChannelInput) => ({ ...mockChannelData })),
  delete: jest.fn((channelId: number) =>
    mockAllChannels.find((channel) => channel.id === channelId)
  ),
});

describe('ChannelService', () => {
  let service: ChannelService;
  let repository: MockType<Repository<Channel>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelService,
        { provide: getRepositoryToken(Channel), useFactory: mockChannelRepository },
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
    repository = module.get(getRepositoryToken(Channel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a channel', async () => {
    const getChannel = await service.getChannel(mockAllChannels[0].id);
    expect(getChannel).toBe(mockAllChannels[0]);
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

  it('should get a group chat channel by event id', async () => {
    const testChannel = mockAllChannels[1];
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
    const getChannelWithParticipant = await service.getChannelByEvent(
      testChannel.event.id,
      'Group Chat',
      testChannel.participants[2].id
    );
    expect(getChannelWithHost).toBe(testChannel);
    expect(getChannelWithCoHost).toBe(testChannel);
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

  it('should delete a channel', async () => {
    const deleteChannel = await service.deleteChannel(mockAllChannels[0].id);
    expect(deleteChannel).toBeTruthy();
  });
});
