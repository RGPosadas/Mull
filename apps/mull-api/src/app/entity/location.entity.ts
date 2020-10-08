import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('point')
  point: string;

  @OneToMany('Event', 'location')
  events: Event[];
}
