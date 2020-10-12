import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Media } from './media.entity';
import { Participants } from './participants.entity';
import { Event } from './event.entity';
import { PostReaction } from './post-reaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({
    default: '',
  })
  timezone: string;

  @OneToOne('Media')
  @JoinColumn()
  avatar: Media;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column({
    default: '',
  })
  description: string;

  /**
   * The friends of this user. People this person is following.
   * e.g: I am friends with you. Your ID would go in this list.
   */
  @ManyToMany('User', 'user')
  friends: User[];

  /**
   * This generates a pivot table named friends.
   * In this column, the current userId would be added.
   */
  @ManyToMany('User', 'friends')
  @JoinTable({ name: 'friends', joinColumn: { name: 'friendId' } })
  user: User[];

  @OneToMany('Participants', 'user')
  participants: Participants[];

  @OneToMany('Event', 'host')
  events: Event[];

  @OneToMany('PostReaction', 'user')
  postReactions: PostReaction[];
}
