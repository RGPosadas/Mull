import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Post } from '../entities';
import { CreatePostInput, UpdatePostInput } from './inputs/post.input';
import { PostService } from './post.service';

const pubSub = new PubSub();

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Subscription(() => Post)
  postAdded() {
    return pubSub.asyncIterator(['postAdded']);
  }

  @Mutation(/* istanbul ignore next */ () => Post)
  async post(@Args('post') post: CreatePostInput) {
    const savedPost = this.postService.createPost(post);
    pubSub.publish('postAdded', {
      postAdded: savedPost,
    });
    return savedPost;
  }

  @Query(/* istanbul ignore next */ () => [Post])
  async posts() {
    return this.postService.getAllPosts();
  }

  @Mutation(/* istanbul ignore next */ () => Post)
  async updateEvent(@Args('post') post: UpdatePostInput) {
    return this.postService.updatePost(post);
  }

  @Mutation(/* istanbul ignore next */ () => Post)
  async deleteEvent(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.postService.deletePost(id);
  }
}
