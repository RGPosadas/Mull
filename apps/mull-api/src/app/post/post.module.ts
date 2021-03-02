import { Module } from '@nestjs/common';
import { ChannelService } from '../channel/channel.service';
import { EntitiesModule } from '../entities';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [EntitiesModule],
  providers: [PostService, ChannelService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
