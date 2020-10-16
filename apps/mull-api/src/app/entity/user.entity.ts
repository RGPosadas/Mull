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
import { Participants } from './participants.entity';
import { Event } from './event.entity';
import { PostReaction } from './post-reaction.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @Field(/* istanbul ignore next */ () => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({
    default: '',
  })
  timezone: string;

  @OneToOne('Media')
  @JoinColumn()
  avatar?: Media;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  age: string;

  @Field()
  @Column({
    default: '',
  })
  description: string;

  /**
   * The friends of this user. People this person is following.
   * e.g: I am friends with you. Your ID would go in this list.
   */
  @ManyToMany('User', 'user')
  @Field(/* istanbul ignore next */ () => [User])
  friends: User[];

  /**
   * This generates a pivot table named friends.
   * In this column, the current userId would be added.
   */
  @ManyToMany('User', 'friends')
  @JoinTable({ name: 'friends', joinColumn: { name: 'friendId' } })
  user?: User[];

  @OneToMany('Participants', 'user')
  participants?: Participants[];

  @OneToMany('Event', 'host')
  events?: Event[];

  @OneToMany('PostReaction', 'user')
  postReactions?: PostReaction[];
}
