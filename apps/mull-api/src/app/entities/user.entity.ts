import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Media } from './media.entity';
import { Event } from './event.entity';
import { PostReaction } from './post-reaction.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IUser, UserType } from '@mull/types';

@Entity()
@ObjectType()
export class User implements IUser {
  @Field(/* istanbul ignore next */ () => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: true })
  password: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({
    default: '',
  })
  timezone: string;

  @OneToOne(/* istanbul ignore next */ () => Media)
  @JoinColumn()
  avatar?: Media;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  dob: Date;

  @Field(() => Int)
  @Column({
    type: 'enum',
    enum: UserType,
  })
  type: UserType;

  @Field()
  @Column({
    default: '',
  })
  description: string;

  /**
   * The friends of this user. People this person is following.
   * e.g: I am friends with you. Your ID would go in this list.
   */
  @ManyToMany(
    /* istanbul ignore next */ () => User,
    /* istanbul ignore next */ (user) => user.friends
  )
  @JoinTable({ name: 'friends' })
  @Field(/* istanbul ignore next */ () => [User])
  friends: User[];

  @OneToMany(
    /* istanbul ignore next */ () => Event,
    /* istanbul ignore next */ (event) => event.host
  )
  events?: Event[];

  @OneToMany(
    /* istanbul ignore next */ () => PostReaction,
    /* istanbul ignore next */ (reaction) => reaction.user
  )
  postReactions?: PostReaction[];
}
