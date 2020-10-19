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
import { PostReaction } from './post-reaction.entity';
import { Media } from './media.entity';

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
