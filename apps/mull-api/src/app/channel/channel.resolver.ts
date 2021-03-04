import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticatedUser, AuthGuard } from '../auth/auth.guard';
import { Channel, DirectMessageChannel } from '../entities';
import { ChannelService } from './channel.service';
import { CreateDmChannelInput } from './inputs/channel.input';
@Resolver('Channel')
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

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

  @Query(/* istanbul ignore next */ () => Channel)
  @UseGuards(AuthGuard)
  async getEventChannel(
    @Args('eventId', { type: /* istanbul ignore next */ () => Int }) eventId: number,
    @Args('channelName') channelName: string,
    @AuthenticatedUser() userId: number
  ) {
    return this.channelService.getChannelByEvent(eventId, channelName, userId);
  }

  @Query(/* istanbul ignore next */ () => DirectMessageChannel)
  @UseGuards(AuthGuard)
  async getDmChannel(
    @Args('input', { type: /* istanbul ignore next */ () => CreateDmChannelInput })
    input: CreateDmChannelInput
  ) {
    const [usr1, usr2] = input.participants;
    const dmChannel = await this.channelService.findUsersInDmChannel(usr1.id, usr2.id);
    if (dmChannel) return dmChannel;
    const { id } = await this.channelService.createDmChannel(input);
    return this.channelService.getDmChannel(id);
  }
}
