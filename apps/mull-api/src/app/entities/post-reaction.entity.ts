import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class PostReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @ManyToOne(() => Post, (post) => post.reactions)
  post: Post;

  @ManyToOne(() => User, (user) => user.postReactions)
  user: User;
}
