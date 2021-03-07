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
export abstract class Channel {
  @Field(/* istanbul ignore next */ () => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(/* istanbul ignore next */ () => [Post])
  @OneToMany(/* istanbul ignore next */ () => Post, (post) => post.channel)
  posts: Post[];

  abstract validateReadPermission(userId: number): boolean;
  abstract validateWritePermission(userId: number): boolean;
}

@ChildEntity()
@ObjectType()
export class DirectMessageChannel extends Channel {
  @Field(/* istanbul ignore next */ () => [User])
  @ManyToMany(/* istanbul ignore next */ () => User)
  @JoinTable({ name: 'dm_participants' })
  participants: User[];

  validateReadPermission(userId: number): boolean {
    return this.participants.some((user) => user.id === userId);
  }

  validateWritePermission(userId: number): boolean {
    return this.participants.some((user) => user.id === userId);
  }
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

  validateReadPermission(userId: number): boolean {
    const host = this.event.host;
    const coHosts = this.event.coHosts;
    const participants = this.event.participants;
    return (
      host.id === userId ||
      coHosts.some((coHost) => coHost.id === userId) ||
      participants.some((participant) => participant.id === userId)
    );
  }

  validateWritePermission(userId: number): boolean {
    const host = this.event.host;
    const coHosts = this.event.coHosts;
    const participants = this.event.participants;
    if (this.rights === 0) {
      return host.id === userId || coHosts.some((coHost) => coHost.id === userId);
    } else if (this.rights === 1) {
      return (
        host.id === userId ||
        coHosts.some((coHost) => coHost.id === userId) ||
        participants.some((participant) => participant.id === userId)
      );
    } else {
      return false;
    }
  }
}
