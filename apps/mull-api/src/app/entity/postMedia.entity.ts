import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Media } from './media.entity';
import { Post } from './post.entity';

@Entity()
export class PostMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne('Media')
  @JoinColumn()
  media: Media;

  @ManyToOne('Post', 'medias')
  post: Post;
}
