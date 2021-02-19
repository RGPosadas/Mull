import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../entities';
import { CreatePostInput } from './inputs/post.input';
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
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create the post', async () => {
    const returnedPost = await service.createPost(mockPartialPosts as CreatePostInput);
    expect(returnedPost).toEqual(returnedPost);
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
