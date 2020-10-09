import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Event } from './event.entity';
import { Post } from './post.entity';
import { Participants } from './participants.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rights: number;

  @ManyToOne('Event', 'channels')
  public event: Event;

  @OneToMany('Post', 'channel')
  posts: Post[];

  @ManyToMany('Participants', 'channels')
  participants: Participants[];
}
