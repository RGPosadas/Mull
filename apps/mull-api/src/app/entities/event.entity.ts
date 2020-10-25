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
import { RestrictionOption } from '@mull/types';

@Entity()
@ObjectType()
export class Event {
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

  @OneToOne(() => Media)
  @JoinColumn()
  image: Media;

  @Column({
    type: 'enum',
    enum: RestrictionOption,
    default: RestrictionOption.NONE,
  })
  restriction: RestrictionOption;

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
