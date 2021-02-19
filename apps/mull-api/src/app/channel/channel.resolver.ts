import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { Channel } from '../entities';
import { ChannelService } from './channel.service';
import { CreateChannelInput } from './inputs/channel.input';
@Resolver('Channel')
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Mutation(/* istanbul ignore next */ () => Boolean)
  @UseGuards(AuthGuard)
  async createChannel(
    @Args('input') input: CreateChannelInput,
    @Args('eventId', { type: /* istanbul ignore next */ () => Int }) eventId?: number
  ) {
    return this.channelService.createChannel(input, eventId);
  }

  @Mutation(/* istanbul ignore next */ () => Boolean)
  @UseGuards(AuthGuard)
  async deleteChannel(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.channelService.deleteChannel(id);
  }

  @Query(/* istanbul ignore next */ () => Channel)
  @UseGuards(AuthGuard)
  async getChannel(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.channelService.getChannel(id);
  }
}
