import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { Media } from './media.entity';
import { PostReaction } from './post-reaction.entity';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Post)
  @JoinColumn()
  parentPost: Post;

  @Column()
  message: string;

  @Column()
  createdTime: Date;

  @OneToMany(() => Media, (media) => media.post)
  medias: Media[];

  @OneToMany(() => PostReaction, (reaction) => reaction.post)
  reactions: PostReaction[];

  @ManyToOne(() => Channel, (channel) => channel.posts)
  channel: Channel;
}
