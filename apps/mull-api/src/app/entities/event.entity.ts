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

  @OneToOne(() => Media)
  @JoinColumn()
  image: Media;

  @OneToMany(() => Channel, (channel) => channel.event)
  channels: Channel[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'event_participants' })
  participants: User[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'event_cohosts' })
  coHosts: User[];

  @ManyToOne(() => User, (user) => user.events)
  host: User;

  @ManyToOne(() => Location, (location) => location.events)
  location: Location;
}
