import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Channel } from './channel.entity';
import { User } from './user.entity';
import { PostMedia } from './post-media.entity';
import { PostReaction } from './post-reaction.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne('Channel', 'posts')
  channel: Channel;
}
