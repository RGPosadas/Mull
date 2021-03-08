import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockAllChannels, mockAllEventChannels } from '../channel/channel.mockdata';
import { ChannelService } from '../channel/channel.service';
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
    return mockAllEventChannels.find((channel) => channel.id === channelId);
  }),
  getChannelByEventId: jest.fn((eventId, channelName, userId) => {
    return mockAllEventChannels.find(
      (channel) =>
        channel.event.id === eventId &&
        channel.name === channelName &&
        channel.event.host.id === userId
    );
  }),
  deleteChannel: jest.fn((channelId: number) =>
    mockAllChannels.find((channel) => channel.id === channelId)
  ),
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
    await expect(() => service.createPost(mockPartialPosts, -100)).rejects.toThrow(
      UnauthorizedException
    );
  });

  it('should fetch all posts', async () => {
    const returnedPosts = await service.getAllPosts();
    expect(returnedPosts).toEqual(mockAllPosts);
  });

  it('should fetch all posts in a given channel', async () => {
    const returnedPosts = await service.getAllChannelPosts(mockAllPosts[0].channel.id);
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
