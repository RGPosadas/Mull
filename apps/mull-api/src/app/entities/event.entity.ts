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
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { EventRestriction, IEvent } from '@mull/types';

@Entity()
@ObjectType()
export class Event implements IEvent {
  @Field(/* istanbul ignore next */ () => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;

  @Field()
  @Column()
  description: string;

  @Field(() => Media)
  @OneToOne(/* istanbul ignore next */ () => Media)
  @Field(() => Media, { nullable: true })
  @JoinColumn()
  image?: Media;

  @Column({
    type: 'enum',
    enum: EventRestriction,
    default: EventRestriction.NONE,
  })
  restriction: EventRestriction;

  @OneToMany(
    /* istanbul ignore next */ () => Channel,
    /* istanbul ignore next */ (channel) => channel.event
  )
  channels?: Channel[];

  @ManyToMany(/* istanbul ignore next */ () => User)
  @JoinTable({ name: 'event_participants' })
  participants?: User[];

  @ManyToMany(/* istanbul ignore next */ () => User)
  @JoinTable({ name: 'event_cohosts' })
  coHosts?: User[];

  @ManyToOne(
    /* istanbul ignore next */ () => User,
    /* istanbul ignore next */ (user) => user.events
  )
  host?: User;

  @ManyToOne(
    /* istanbul ignore next */ () => Location,
    /* istanbul ignore next */ (location) => location.events
  )
  location?: Location;
}
