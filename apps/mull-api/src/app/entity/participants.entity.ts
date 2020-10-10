import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Event } from './event.entity';
import { User } from './user.entity';
import { Channel } from './channel.entity';

@Entity()
export class Participants {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isCohost: boolean;

  @ManyToMany('Event', 'participants')
  public events: Event[];

  @ManyToOne('User', 'participants')
  user: User;

  @ManyToMany('Channel', 'participants')
  @JoinTable({ name: 'channel_participants' })
  channels: Channel[];
}
