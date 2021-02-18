import { Module } from '@nestjs/common';
import { EntitiesModule } from '../entities';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';

@Module({
  imports: [EntitiesModule],
  providers: [ChannelService, ChannelResolver],
  exports: [ChannelService],
})
export class ChannelModule {}
