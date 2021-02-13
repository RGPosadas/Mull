import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Post } from '../entities';
import { CreatePostInput, UpdatePostInput } from './inputs/post.input';
import pubSub from './post.pubsub';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  @Subscription(/* istanbul ignore next */ () => Post)
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
  async updatePost(@Args('post') post: UpdatePostInput) {
    return this.postService.updatePost(post);
  }

  @Mutation(/* istanbul ignore next */ () => Post)
  async deletePost(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.postService.deletePost(id);
  }
}
