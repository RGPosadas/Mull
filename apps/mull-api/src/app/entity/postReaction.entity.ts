import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @ManyToOne('Post', 'reactions')
  post: Post;
}
