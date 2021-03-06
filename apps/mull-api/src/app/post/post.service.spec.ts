import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockAllChannels } from '../channel/channel.mockdata';
import { ChannelService } from '../channel/channel.service';
import { CreateChannelInput } from '../channel/inputs/channel.input';
import { Post } from '../entities';
import { mockAllPosts, mockPartialPosts } from './post.mockdata';
import { PostService } from './post.service';

const mockPostRepository = () => ({
  findOne: jest.fn((id: number) => {
    return mockAllPosts.find((post) => post.id === id);
  }),
  find: jest.fn(() => mockAllPosts),
  update: jest.fn((id: number) => mockAllPosts.find((post) => post.id === id)),
  delete: jest.fn((id: number) => mockAllPosts.find((post) => post.id === id)),
  save: jest.fn((post: Post) => post),
  query: jest.fn().mockReturnThis(),
});

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
  validateEventChannelWritePermission: jest.fn((data, userId) => data.event.host.id === userId),
});

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useFactory: mockPostRepository,
        },
        { provide: ChannelService, useFactory: mockChannelService },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create the post', async () => {
    const returnedPost = await service.createPost(mockPartialPosts, 7);
    expect(returnedPost).toEqual({ ...mockPartialPosts, user: { id: 7 } });
  });

  it('should not create the post due to invalid user permission', async () => {
    expect(async () => await service.createPost(mockPartialPosts, -100)).rejects.toThrow();
  });

  it('should fetch all posts', async () => {
    const returnedPosts = await service.getAllPosts();
    expect(returnedPosts).toEqual(mockAllPosts);
  });

  it('should update the post', async () => {
    const updatedPost = await service.updatePost(mockAllPosts[0]);
    expect(updatedPost).toEqual(mockAllPosts[0]);
  });

  it('should return the deleted event', async () => {
    const deletedPost = await service.deletePost(23);
    expect(deletedPost).toEqual(mockAllPosts.find((post) => post.id === 23));
  });
});
