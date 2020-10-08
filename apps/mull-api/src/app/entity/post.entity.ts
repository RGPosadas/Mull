import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Channel } from './channel.entity';
import { User } from './user.entity';
import { PostMedia } from './postMedia.entity';
import { PostReaction } from './postReaction.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne('Channel')
  @JoinColumn()
  channel: Channel;

  @OneToOne('User')
  @JoinColumn()
  user: User;

  @OneToOne('Post')
  @JoinColumn()
  parentPost: Post;

  @Column()
  message: string;

  @Column()
  createdTime: Date;

  @OneToMany('PostMedia', 'post')
  medias: PostMedia[];

  @OneToMany('PostReaction', 'post')
  reactions: PostReaction[];
}
