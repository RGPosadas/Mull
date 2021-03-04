import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Entities
import { Channel, DirectMessageChannel, EventChannel } from './channel.entity';
import { Event } from './event.entity';
import { Location, Point } from './location.entity';
import { Media } from './media.entity';
import { PostReaction } from './post-reaction.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

/**
 * Encapsulates all entities of the application.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channel,
      Event,
      Location,
      Media,
      PostReaction,
      Post,
      Point,
      User,
      EventChannel,
      DirectMessageChannel,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
