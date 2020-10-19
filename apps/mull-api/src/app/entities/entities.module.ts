import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Channel } from './channel.entity';
import { Event } from './event.entity';
import { Location } from './location.entity';
import { Media } from './media.entity';
import { PostReaction } from './post-reaction.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

/**
 * Encapsulates all entities of the application.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Channel, Event, Location, Media, PostReaction, Post, User])],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
