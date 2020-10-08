import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Event } from './event.entity';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rights: number;

  @ManyToOne('Event', 'channels')
  public event: Event;

  @ManyToMany('User', 'channels')
  @JoinTable({ name: 'channel_participants' })
  public channelParticipants: User[];

  @ManyToMany('Post')
  @JoinTable()
  posts: Post[];
}
