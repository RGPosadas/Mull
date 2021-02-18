import { Injectable } from '@nestjs/common';
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

  getChannel(channelId: number): Promise<Channel> {
    return this.channelRepository.findOne(channelId);
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
