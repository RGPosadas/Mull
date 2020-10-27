import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Media {
  constructor(mediaType: string) {
    this.mediaType = mediaType;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mediaType: string;

  @ManyToOne(() => Post, (post) => post.medias)
  post: Post;
}
