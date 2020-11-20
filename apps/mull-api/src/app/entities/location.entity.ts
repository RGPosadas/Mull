import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Event } from './event.entity';

import { ILocation } from '@mull/types';

@Entity()
export class Location implements ILocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('point')
  point: string;

  @OneToMany(() => Event, (event) => event.location)
  events: Event[];
}
