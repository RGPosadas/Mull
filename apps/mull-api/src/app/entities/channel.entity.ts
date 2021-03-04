import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  ChildEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { Event, Post, User } from './';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'channelType' } })
@ObjectType()
export class Channel {
  @Field(/* istanbul ignore next */ () => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(/* istanbul ignore next */ () => [Post])
  @OneToMany(/* istanbul ignore next */ () => Post, (post) => post.channel)
  posts: Post[];
}

@ChildEntity()
@ObjectType()
export class DirectMessageChannel extends Channel {
  @Field(/* istanbul ignore next */ () => [User])
  @ManyToMany(/* istanbul ignore next */ () => User)
  @JoinTable({ name: 'dm_participants' })
  participants: User[];
}

@ChildEntity()
@ObjectType()
export class EventChannel extends Channel {
  @Field()
  @Column()
  name: string;

  @Field(/* istanbul ignore next */ () => Int)
  @Column({ comment: '0: host only, 1: all participants' })
  rights: number;

  @Field(/* istanbul ignore next */ () => Event, { nullable: true })
  @ManyToOne(/* istanbul ignore next */ () => Event, (event) => event.channels, { nullable: true })
  event?: Event;
}
