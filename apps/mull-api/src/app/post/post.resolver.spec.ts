import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostInput, UpdatePostInput } from './inputs/post.input';
import { mockAllPosts, mockPartialPosts } from './post.mockdata';
import pubSub from './post.pubsub';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

jest.mock('./post.pubsub');

const mockPostService = () => ({
  createPost: jest.fn((mockPostData: CreatePostInput) => mockPostData),
  getPost: jest.fn((id: number) => mockAllPosts.find((post) => post.id === id)),
  updatePost: jest.fn((mockPostData: UpdatePostInput) => ({ ...mockPostData })),
  deletePost: jest.fn((id: number) => mockAllPosts.find((post) => post.id === id)),
  getAllPosts: jest.fn(() => mockAllPosts),
  getAllChannelPosts: jest.fn(() => mockAllPosts),
});

describe('PostResolver', () => {
  let resolver: PostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostResolver,
        {
          provide: PostService,
          useFactory: mockPostService,
        },
      ],
    }).compile();
    resolver = module.get<PostResolver>(PostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get all posts', async () => {
    const allPosts = await resolver.posts();
    expect(allPosts).toEqual(mockAllPosts);
  });

  it('should fetch all posts in a given channel', async () => {
    const returnedPosts = await resolver.channelPosts(mockAllPosts[0].channel.id);
    expect(returnedPosts).toEqual(mockAllPosts);
  });

  it('it should subscribe to new messages', async () => {
    await resolver.post(mockPartialPosts, 5);
    expect(pubSub.publish).toHaveBeenCalled();
  });

  it('should update the post', async () => {
    const updatedEvent = await resolver.updatePost(mockPartialPosts as UpdatePostInput);
    expect(updatedEvent).toEqual(mockPartialPosts);
  });

  it('should return the deleted post', async () => {
    const deletedPost = await resolver.deletePost(23);
    expect(deletedPost).toEqual(mockAllPosts.find((post) => post.id === 23));
  });
});
