import { ILocation } from '@mull/types';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Location implements ILocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Event, (event) => event.location)
  events: Event[];
}
