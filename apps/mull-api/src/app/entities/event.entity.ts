import { EventRestriction, IEvent, LIMITS } from '@mull/types';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventChannel } from './channel.entity';
import { Location } from './location.entity';
import { Media } from './media.entity';
import { User } from './user.entity';

registerEnumType(EventRestriction, {
  name: 'EventRestriction',
});

@Entity()
@ObjectType()
export class Event implements IEvent {
  @Field(/* istanbul ignore next */ () => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: LIMITS.EVENT_TITLE })
  title: string;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;

  @Field()
  @Column({ length: LIMITS.DESCRIPTION })
  description: string;

  @OneToOne(/* istanbul ignore next */ () => Media)
  @Field(() => Media, { nullable: true })
  @JoinColumn()
  image?: Media;

  @Field(() => Number)
  @Column({
    type: 'enum',
    enum: EventRestriction,
    default: EventRestriction.NONE,
  })
  restriction: EventRestriction;

  @OneToMany(
    /* istanbul ignore next */ () => EventChannel,
    /* istanbul ignore next */ (channel) => channel.event,
    { cascade: true }
  )
  channels?: EventChannel[];

  @ManyToMany(/* istanbul ignore next */ () => User)
  @JoinTable({ name: 'event_participants' })
  participants?: User[];

  @Field(/* istanbul ignore next */ () => [User])
  @ManyToMany(/* istanbul ignore next */ () => User)
  @JoinTable({ name: 'event_cohosts' })
  coHosts?: User[];

  @Field(/* istanbul ignore next */ () => User)
  @ManyToOne(
    /* istanbul ignore next */ () => User,
    /* istanbul ignore next */ (user) => user.events
  )
  host?: User;

  @Field({ nullable: true })
  @JoinColumn()
  @OneToOne(/* istanbul ignore next */ () => Location, (location) => location.event, {
    cascade: true,
  })
  location?: Location;
}
