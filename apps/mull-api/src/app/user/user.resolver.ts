import { UserRelationship } from '@mull/types';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { AuthenticatedUser, AuthGuard } from '../auth/auth.guard';
import { ChannelService } from '../channel/channel.service';
import { Friend, Media, User } from '../entities';
import { EventService } from '../event/event.service';
import { MediaService } from '../media/media.service';
import { PostService } from '../post/post.service';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { UserService } from './user.service';

@Resolver(/* istanbul ignore next */ () => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly eventService: EventService,
    private readonly mediaService: MediaService,
    private readonly channelService: ChannelService,
    private readonly postService: PostService
  ) {}

  @Query(/* istanbul ignore next */ () => [User])
  @UseGuards(AuthGuard)
  async users() {
    return this.userService.getAllUsers();
  }

  @Query(/* istanbul ignore next */ () => User)
  async user(@AuthenticatedUser() id: number) {
    return this.userService.getUser(id);
  }

  @Query(/* istanbul ignore next */ () => [Friend])
  async friends(@AuthenticatedUser() id: number) {
    const friends = await this.userService.getFriends(id);
    const modifiedFriends: Friend[] = [];

    for (const friend of friends) {
      const channel = await this.channelService.findDirectMessageChannelByUserIds(id, friend.id);
      const latestPost = channel ? await this.postService.getLatestPost(channel.id) : null;
      const modifiedFriend: Friend = {
        ...friend,
        latestPost: latestPost,
        directMessageChannel: channel,
      };
      modifiedFriends.push(modifiedFriend);
    }
    return modifiedFriends;
  }

  @Mutation(/* istanbul ignore next */ () => User)
  async createUser(@Args('user') user: CreateUserInput) {
    return this.userService.createUser(user);
  }

  private async handleNewAvatar(
    newAvatar: FileUpload,
    user: User,
    userInput: UpdateUserInput
  ): Promise<UpdateUserInput> {
    let media: Media;
    if (newAvatar) {
      if (user.avatar) {
        const oldMediaId = user.avatar.id;
        media = await this.mediaService.updateFile(newAvatar, user.avatar);
        this.mediaService.deleteMedia(oldMediaId);
      } else {
        media = await this.mediaService.uploadFile(newAvatar);
      }
      return {
        ...userInput,
        avatar: media,
      };
    }
    return userInput;
  }

  @Mutation(/* istanbul ignore next */ () => User)
  @UseGuards(AuthGuard)
  async updateUser(
    @Args('userInput') userInput: UpdateUserInput,
    @Args('newAvatar', { type: /* istanbul ignore next */ () => GraphQLUpload, nullable: true })
    newAvatar: FileUpload
  ) {
    const user = await this.userService.getUser(userInput.id);
    userInput = await this.handleNewAvatar(newAvatar, user, userInput);
    return this.userService.updateUser(userInput);
  }

  @Mutation(/* istanbul ignore next */ () => User)
  async deleteUser(@AuthenticatedUser() id: number) {
    return this.userService.deleteUser(id);
  }

  @Query(/* istanbul ignore next */ () => Int)
  async friendCount(@AuthenticatedUser() id: number) {
    return (await this.userService.getFriends(id)).length;
  }

  @Query(/* istanbul ignore next */ () => Int)
  async hostingCount(@AuthenticatedUser() id: number) {
    return (await this.eventService.getEventsHostedByUser(id)).length;
  }

  @Query(/* istanbul ignore next */ () => Int)
  async portfolioCount(@AuthenticatedUser() id: number) {
    return (await this.eventService.getUserEventsPortfolio(id)).length;
  }

  @Mutation(/* istanbul ignore next */ () => Boolean)
  async addFriend(
    @AuthenticatedUser() currentUserId: number,
    @Args('userIdToAdd') userIdToAdd: number
  ) {
    return this.userService.addFriend(currentUserId, userIdToAdd);
  }

  @Query(/* istanbul ignore next */ () => UserRelationship)
  async getUserRelationship(@AuthenticatedUser() userA: number, @Args('userB') userB: number) {
    const userAFriends = await this.userService.getFriends(userA);
    const userBFriends = await this.userService.getFriends(userB);

    const AaddedB = !!userAFriends.find((friend) => userB === friend.id);
    const BaddedA = !!userBFriends.find((friend) => userA === friend.id);

    if (AaddedB && BaddedA) {
      return UserRelationship.FRIENDS;
    } else if (AaddedB) {
      return UserRelationship.PENDING_REQUEST;
    } else if (BaddedA) {
      return UserRelationship.ADDED_ME;
    } else {
      return UserRelationship.NONE;
    }
  }
}
