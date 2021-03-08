import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticatedUser, AuthGuard } from '../auth/auth.guard';
import { DirectMessageChannel, EventChannel } from '../entities';
import { ChannelService } from './channel.service';
@Resolver('Channel')
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Mutation(/* istanbul ignore next */ () => DirectMessageChannel)
  @UseGuards(AuthGuard)
  async createDirectMessageChannel(
    @Args('toUserId', { type: /* istanbul ignore next */ () => Int }) toUserId: number,
    @AuthenticatedUser() fromUserId: number
  ) {
    return this.channelService.createDirectMessageChannel(fromUserId, toUserId);
  }

  @Mutation(/* istanbul ignore next */ () => Boolean)
  @UseGuards(AuthGuard)
  async deleteChannel(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.channelService.deleteChannel(id);
  }

  @Query(/* istanbul ignore next */ () => EventChannel)
  @UseGuards(AuthGuard)
  async getChannelByEventId(
    @Args('eventId', { type: /* istanbul ignore next */ () => Int }) eventId: number,
    @Args('channelName') channelName: string,
    @AuthenticatedUser() userId: number
  ) {
    return this.channelService.getChannelByEventId(eventId, channelName, userId);
  }

  @Query(/* istanbul ignore next */ () => DirectMessageChannel, { nullable: true })
  @UseGuards(AuthGuard)
  async getDirectMessageChannel(
    @Args('toUserId', { type: /* istanbul ignore next */ () => Int })
    toUserId: number,
    @AuthenticatedUser() fromUserId: number
  ) {
    const directMessageChannel = await this.channelService.findDirectMessageChannelByUserIds(
      fromUserId,
      toUserId
    );
    return directMessageChannel ? directMessageChannel : null;
  }
}
