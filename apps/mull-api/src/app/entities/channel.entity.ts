import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Channel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  rights: number;

  @Field(() => Event, { nullable: true })
  @ManyToOne(() => Event, (event) => event.channels, { nullable: true })
  event?: Event;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.channel)
  posts: Post[];

  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable({ name: 'channel_participants' })
  participants: User[];
}
