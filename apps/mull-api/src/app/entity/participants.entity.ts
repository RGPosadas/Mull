import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Event } from './event.entity';
import { User } from './user.entity';

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
}
