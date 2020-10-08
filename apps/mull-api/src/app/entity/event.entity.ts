import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Media } from './media.entity';
import { Channel } from './channel.entity';
import { Participants } from './participants.entity';
import { User } from './user.entity';
import { Location } from './location.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @OneToOne('Media')
  @JoinColumn()
  image: Media;

  @OneToMany('Channel', 'event')
  public channels: Channel[];

  @ManyToMany('Participants', 'events')
  @JoinTable({ name: 'event_participants' })
  public participants: Participants[];

  @ManyToOne('User', 'events')
  host: User;

  @ManyToOne('Location', 'events')
  location: Location;
}
