import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Media {
  constructor(mediaType) {
    this.mediaType = mediaType;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mediaType: string;

  @ManyToOne(() => Post, (post) => post.medias)
  post: Post;
}
