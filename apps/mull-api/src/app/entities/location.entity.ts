import { ILocation, IPoint } from '@mull/types';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../entities';

@Entity()
@ObjectType()
export class Point implements IPoint {
  @Field(/* istanbul ignore next */ () => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('decimal', { precision: 10, scale: 7 })
  lat: number;

  @Field()
  @Column('decimal', { precision: 10, scale: 7 })
  long: number;
}

@Entity()
@ObjectType()
export class Location implements ILocation {
  @Field(/* istanbul ignore next */ () => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @OneToOne(() => Event, (event) => event.location)
  event: Event;

  @Field({ nullable: true })
  @OneToOne(() => Point, { cascade: true })
  @JoinColumn()
  coordinates: Point;

  @Field({ nullable: true })
  @Column({ nullable: true })
  placeId: string;
}
