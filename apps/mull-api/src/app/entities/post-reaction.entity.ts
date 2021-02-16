import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class PostReaction {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  type: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.reactions)
  post: Post;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.postReactions)
  user: User;
}
