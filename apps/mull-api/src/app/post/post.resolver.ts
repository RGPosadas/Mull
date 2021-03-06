import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AuthenticatedUser, AuthGuard } from '../auth/auth.guard';
import { Post } from '../entities';
import { CreatePostInput, UpdatePostInput } from './inputs/post.input';
import pubSub from './post.pubsub';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  @Subscription(/* istanbul ignore next */ () => Post)
  postAdded(@Args('channelId', { type: /* istanbul ignore next */ () => Int }) channelId: number) {
    return pubSub.asyncIterator(['postAdded' + channelId]);
  }

  @Mutation(/* istanbul ignore next */ () => Post)
  async post(@Args('post') post: CreatePostInput, @AuthenticatedUser() userId: number) {
    const partialSavedPost = await this.postService.createPost(post, userId); // typeORM does not return the complete entity
    const completeSavedPost = await this.postService.getPost(partialSavedPost.id);
    pubSub.publish('postAdded' + post.channel.id, {
      postAdded: completeSavedPost,
    });
    return completeSavedPost;
  }

  @Query(/* istanbul ignore next */ () => [Post])
  @UseGuards(AuthGuard)
  async posts() {
    return this.postService.getAllPosts();
  }

  @Mutation(/* istanbul ignore next */ () => Post)
  @UseGuards(AuthGuard)
  async updatePost(@Args('post') post: UpdatePostInput) {
    return this.postService.updatePost(post);
  }

  @Mutation(/* istanbul ignore next */ () => Post)
  @UseGuards(AuthGuard)
  async deletePost(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.postService.deletePost(id);
  }

  @Query(/* istanbul ignore next */ () => [Post])
  @UseGuards(AuthGuard)
  async channelPosts(@Args('channelId', { type: () => Int }) channelId: number) {
    return this.postService.getAllChannelPosts(channelId);
  }
}
