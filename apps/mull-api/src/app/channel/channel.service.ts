import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel, DirectMessageChannel, EventChannel } from '../entities';
import { CreateDmChannelInput, CreateEventChannelInput } from './inputs/channel.input';
@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
    @InjectRepository(EventChannel)
    private eventChannelRepository: Repository<EventChannel>,
    @InjectRepository(DirectMessageChannel)
    private dmChannelRepository: Repository<DirectMessageChannel>
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

  getEventChannel(channelId: number): Promise<EventChannel> {
    return this.eventChannelRepository.findOne(channelId);
  }

  getDmChannel(channelId: number): Promise<DirectMessageChannel> {
    return this.dmChannelRepository.findOne(channelId, { relations: ['participants'] });
  }

  async createEventChannel(input: CreateEventChannelInput, eventId: number): Promise<boolean> {
    await this.eventChannelRepository.save({ ...input, event: { id: eventId } });
    return true;
  }

  async createDmChannel(input: CreateDmChannelInput): Promise<DirectMessageChannel> {
    return await this.dmChannelRepository.save(input);
  }

  async deleteChannel(channelId: number): Promise<boolean> {
    await this.channelRepository.delete(channelId);
    return true;
  }

  async findUsersInDmChannel(userId1: number, userId2: number): Promise<DirectMessageChannel> {
    const dmChannelsList = await this.dmChannelRepository
      .createQueryBuilder()
      .leftJoinAndSelect('DirectMessageChannel.participants', 'participants')
      .where('participants.id = :userId1 OR participants.id = :userId2', { userId1, userId2 })
      .getMany();

    // TODO: redo this filtering as TypeORM syntax
    return dmChannelsList.find(({ participants }) => {
      let count = 0;
      for (const participant of participants) {
        if (participant.id === userId1 || participant.id === userId2) count++;
      }
      return count === 2;
    });
  }
}
