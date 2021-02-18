import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Channel } from '../entities';
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelService,
        { provide: getRepositoryToken(Channel), useFactory: mockChannelRepository },
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a channel', async () => {
    const getChannel = await service.getChannel(mockAllChannels[0].id);
    expect(getChannel).toBe(mockAllChannels[0]);
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
