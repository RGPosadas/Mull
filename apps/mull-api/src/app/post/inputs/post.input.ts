import { Field, InputType, Int } from '@nestjs/graphql';
import { ChannelInput } from '../../channel/inputs/channel.input';
import { Media } from '../../entities';
import { MediaInput } from '../../media/inputs/media.input';
import { UserInput } from '../../user/inputs/user.input';
import { ParentPostInput } from './parent-post.input';
import { PostReactionInput } from './post-reaction.input';

@InputType()
export class CreatePostInput {
  @Field(/* istanbul ignore next */ () => UserInput)
  user: UserInput;

  @Field()
  message: string;

  @Field()
  createdTime: Date;

  @Field(/* istanbul ignore next */ () => ChannelInput, { nullable: true }) //TODO: remove nullable in TASK-58
  channel: ChannelInput;

  @Field(/* istanbul ignore next */ () => ParentPostInput, { nullable: true })
  parentPost?: ParentPostInput;

  @Field(/* istanbul ignore next */ () => MediaInput, { nullable: true })
  medias?: Media[];

  @Field(/* istanbul ignore next */ () => PostReactionInput, { nullable: true })
  reactions?: PostReactionInput[];
}

@InputType()
export class UpdatePostInput extends CreatePostInput {
  @Field(/* istanbul ignore next */ () => Int)
  id: number;
}
