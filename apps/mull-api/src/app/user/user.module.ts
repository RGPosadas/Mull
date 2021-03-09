import { Module } from '@nestjs/common';
import { ChannelService } from '../channel/channel.service';
import { EntitiesModule } from '../entities';
import { EventService } from '../event/event.service';
import { MediaService } from '../media/media.service';
import { PostService } from '../post/post.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [EntitiesModule],
  providers: [UserResolver, UserService, EventService, MediaService, ChannelService, PostService],
  exports: [UserService],
})
export class UserModule {}
