import { IUser, LIMITS, RegistrationMethod, RelationshipType } from '@mull/types';
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
import { DirectMessageChannel, Event, Media, Post, PostReaction } from './';

registerEnumType(RegistrationMethod, {
  name: 'RegistrationMethod',
});

registerEnumType(RelationshipType, {
  name: 'RelationshipType',
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

  @Field(/* istanbul ignore next */ () => Media, { nullable: true })
  @OneToOne(/* istanbul ignore next */ () => Media)
  @JoinColumn()
  avatar?: Media;

  @Field()
  @Column({ length: LIMITS.USERNAME })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dob?: Date;

  @Field(() => RegistrationMethod)
  @Column({
    type: 'enum',
    enum: RegistrationMethod,
  })
  registrationMethod: RegistrationMethod;

  @Field()
  @Column({
    default: '',
    length: LIMITS.DESCRIPTION,
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
  @JoinTable({
    name: 'friends',
    joinColumn: {
      name: 'adder',
    },
    inverseJoinColumn: {
      name: 'added',
    },
  })
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

  @Column()
  @Field()
  joinDate?: Date;

  @OneToMany(/* istanbul ignore next */ () => Post, /* istanbul ignore next */ (post) => post.user)
  posts?: Post[];
}

@ObjectType()
export class Friend extends User {
  @Field(/* istanbul ignore next */ () => Post, { nullable: true })
  latestPost: Post;

  @Field(/* istanbul ignore next */ () => DirectMessageChannel, { nullable: true })
  directMessageChannel: DirectMessageChannel;
}
