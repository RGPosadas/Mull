import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
@ObjectType()
export class Media {
  constructor(mediaType: string) {
    this.mediaType = mediaType;
  }
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  mediaType: string;

  @ManyToOne(() => Post, (post) => post.medias)
  post: Post;
}
