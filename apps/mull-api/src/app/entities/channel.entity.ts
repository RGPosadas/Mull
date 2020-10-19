import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Event } from './event.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rights: number;

  @ManyToOne(() => Event, (event) => event.channels)
  event: Event;

  @OneToMany(() => Post, (post) => post.channel)
  posts: Post[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'channel_participants' })
  participants: User[];
}
