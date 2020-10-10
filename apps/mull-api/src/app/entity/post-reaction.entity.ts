import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class PostReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @ManyToOne('Post', 'reactions')
  post: Post;

  @ManyToOne('User', 'postReactions')
  user: User;
}
