import { IMedia } from '@mull/types';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
@ObjectType()
export class Media implements IMedia {
  constructor(mediaType: string) {
    this.mediaType = mediaType;
  }
  @Field(/* istanbul ignore next */ () => ID)
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  @Field()
  mediaType: string;

  @ManyToOne(() => Post, (post) => post.medias)
  post: Post;
}
