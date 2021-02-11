import { Field, InputType, Int } from '@nestjs/graphql';
import { PostReaction } from '../../entities';

@InputType()
export class PostReactionInput implements Partial<PostReaction> {
  @Field(/* istanbul ignore next */ () => Int)
  id: number;
}
