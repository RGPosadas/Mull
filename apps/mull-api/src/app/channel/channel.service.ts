import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from '../entities';
import { CreateChannelInput } from './inputs/channel.input';
@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>
  ) {}

  validateEventChannelWritePermission(channel: Channel, userId: number) {
    const host = channel.event.host;
    const coHosts = channel.event.coHosts;
    const participants = channel.event.participants;
    if (channel.rights === 0) {
      return host.id === userId || coHosts.some((coHost) => coHost.id === userId);
    } else if (channel.rights === 1) {
      return (
        host.id === userId ||
        coHosts.some((coHost) => coHost.id === userId) ||
        participants.some((participant) => participant.id === userId)
      );
    } else {
      return false;
    }
  }

  validateEventChannelReadPermission(channel: Channel, userId: number) {
    const host = channel.event.host;
    const coHosts = channel.event.coHosts;
    const participants = channel.event.participants;
    return (
      host.id === userId ||
      coHosts.some((coHost) => coHost.id === userId) ||
      participants.some((participant) => participant.id === userId)
    );
  }

  getChannel(channelId: number): Promise<Channel> {
    return this.channelRepository.findOne(channelId, {
      relations: ['event', 'event.host', 'event.coHosts', 'event.participants'],
    });
  }

  async getChannelByEvent(eventId: number, channelName: string, userId: number): Promise<Channel> {
    const channel = await this.channelRepository.findOne({
      relations: [
        'posts',
        'posts.user',
        'posts.user.avatar',
        'event',
        'event.host',
        'event.coHosts',
        'event.participants',
      ],
      where: { event: { id: eventId }, name: channelName },
    });
    if (this.validateEventChannelReadPermission(channel, userId)) {
      return channel;
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async createChannel(input: CreateChannelInput, eventId?: number): Promise<boolean> {
    await this.channelRepository.save({ ...input, event: { id: eventId } });
    return true;
  }

  async deleteChannel(channelId: number): Promise<boolean> {
    await this.channelRepository.delete(channelId);
    return true;
  }
}
