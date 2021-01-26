import { ILocation, IPoint } from '@mull/types';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../entities';

@Entity()
@ObjectType()
export class Point implements IPoint {
  @Field(/* istanbul ignore next */ () => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('double')
  lat: number;

  @Field()
  @Column('double')
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

  @OneToMany(() => Event, (event) => event.location)
  events: Event[];

  @Field({ nullable: true })
  @OneToOne(() => Point, { cascade: true })
  @JoinColumn()
  coordinates: Point;

  @Field({ nullable: true })
  @Column({ nullable: true })
  placeId: string;
}
