import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel, DirectMessageChannel, EventChannel } from '../entities';
import { CreateEventChannelInput } from './inputs/channel.input';
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

  getChannel(channelId: number): Promise<Channel> {
    return this.channelRepository.findOne(channelId, {
      relations: ['event', 'event.host', 'event.coHosts', 'event.participants', 'participants'],
    });
  }

  getEventChannel(channelId: number): Promise<EventChannel> {
    return this.eventChannelRepository.findOne(channelId, {
      relations: ['event', 'event.host', 'event.coHosts', 'event.participants'],
    });
  }

  async getChannelByEventId(
    eventId: number,
    channelName: string,
    userId: number
  ): Promise<EventChannel> {
    const eventChannel = await this.eventChannelRepository.findOne({
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
    if (eventChannel.validateReadPermission(userId)) {
      return eventChannel;
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async getDmChannel(channelId: number, userId: number): Promise<DirectMessageChannel> {
    const dmChannel = await this.dmChannelRepository.findOne(channelId, {
      relations: ['participants'],
    });
    if (dmChannel.validateReadPermission(userId)) {
      return dmChannel;
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async createEventChannel(input: CreateEventChannelInput, eventId: number): Promise<boolean> {
    await this.eventChannelRepository.save({ ...input, event: { id: eventId } });
    return true;
  }

  async createDmChannel(fromUserId: number, toUserId: number): Promise<DirectMessageChannel> {
    return this.dmChannelRepository.save({ participants: [{ id: fromUserId }, { id: toUserId }] });
  }

  async deleteChannel(channelId: number): Promise<boolean> {
    await this.channelRepository.delete(channelId);
    return true;
  }

  async findDirectMessageChannelByUserIds(
    userId1: number,
    userId2: number
  ): Promise<DirectMessageChannel> {
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
