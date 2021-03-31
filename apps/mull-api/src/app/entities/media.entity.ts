import { IMedia } from '@mull/types';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
@ObjectType()
export class Media implements IMedia {
  constructor(mediaType: string) {
    this.mediaType = mediaType;
  }
  @Field(/* istanbul ignore next */ () => Int)
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  @Field()
  mediaType: string;

  @OneToOne(() => Post, (post) => post.media, { cascade: true })
  @JoinColumn()
  post: Post;
}
