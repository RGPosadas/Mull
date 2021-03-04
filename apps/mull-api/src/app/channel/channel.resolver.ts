import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticatedUser, AuthGuard } from '../auth/auth.guard';
import { Channel, DirectMessageChannel } from '../entities';
import { UserInput } from '../user/inputs/user.input';
import { ChannelService } from './channel.service';
import { CreateDmChannelInput, CreateEventChannelInput } from './inputs/channel.input';
@Resolver('Channel')
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Mutation(/* istanbul ignore next */ () => Boolean)
  @UseGuards(AuthGuard)
  async createEventChannel(
    @Args('input') input: CreateEventChannelInput,
    @Args('eventId', { type: /* istanbul ignore next */ () => Int }) eventId?: number
  ) {
    return this.channelService.createEventChannel(input, eventId);
  }

  @Mutation(/* istanbul ignore next */ () => DirectMessageChannel)
  @UseGuards(AuthGuard)
  async createDmChannel(@Args('input') input: CreateDmChannelInput) {
    return this.channelService.createDmChannel(input);
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

  @Query(/* istanbul ignore next */ () => Channel)
  @UseGuards(AuthGuard)
  async getEventChannel(
    @Args('eventId', { type: /* istanbul ignore next */ () => Int }) eventId: number,
    @Args('channelName') channelName: string,
    @AuthenticatedUser() userId: number
  ) {
    return this.channelService.getChannelByEvent(eventId, channelName, userId);
  }

  @Query(/* istanbul ignore next */ () => DirectMessageChannel, { nullable: true })
  @UseGuards(AuthGuard)
  async getDmChannel(
    @Args('participants', { type: /* istanbul ignore next */ () => [UserInput] })
    participants: UserInput[]
  ) {
    const [usr1, usr2] = participants;
    const dmChannel = await this.channelService.findUsersInDmChannel(usr1.id, usr2.id);
    return dmChannel ? dmChannel : null;
  }
}
