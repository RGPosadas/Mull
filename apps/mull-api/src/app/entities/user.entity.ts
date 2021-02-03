import { IUser, RegistrationMethod } from '@mull/types';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Media } from './media.entity';
import { PostReaction } from './post-reaction.entity';

registerEnumType(RegistrationMethod, {
  name: 'RegistrationMethod',
});

@Entity()
@ObjectType()
export class User implements IUser {
  constructor(id?: number) {
    this.id = id;
  }

  @Field(/* istanbul ignore next */ () => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
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

  @Field(() => RegistrationMethod)
  @Column({
    type: 'enum',
    enum: RegistrationMethod,
  })
  registrationMethod: RegistrationMethod;

  @Field()
  @Column({
    default: '',
  })
  description: string;

  @Column('int', { default: 0 })
  tokenVersion: number;

  /**
   * The friends of this user. People this person is following.
   * e.g: I am friends with you. Your id would go in this list.
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
