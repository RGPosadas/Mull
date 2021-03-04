import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channel, DirectMessageChannel, EventChannel } from './channel.entity';
import { Media } from './media.entity';
import { PostReaction } from './post-reaction.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Post {
  @Field(/* istanbul ignore next */ () => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(/* istanbul ignore next */ () => User)
  @ManyToOne(/* istanbul ignore next */ () => User, /* istanbul ignore next */ (user) => user.posts)
  user: User;

  @Field({ nullable: true })
  @OneToOne(/* istanbul ignore next */ () => Post)
  @JoinColumn()
  parentPost?: Post;

  @Field()
  @Column()
  message: string;

  @Field()
  @Column()
  createdTime: Date;

  @Field(/* istanbul ignore next */ () => [Media], { nullable: true })
  @OneToMany(() => Media, (media) => media.post)
  medias?: Media[];

  @Field(/* istanbul ignore next */ () => [PostReaction], { nullable: true })
  @OneToMany(/* istanbul ignore next */ () => PostReaction, (reaction) => reaction.post)
  reactions?: PostReaction[];

  @Field(/* istanbul ignore next */ () => EventChannel || DirectMessageChannel)
  @ManyToOne(/* istanbul ignore next */ () => Channel, (channel) => channel.posts)
  channel: EventChannel | DirectMessageChannel;
}
