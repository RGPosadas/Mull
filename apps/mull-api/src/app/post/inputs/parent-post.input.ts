import { Field, InputType, Int } from '@nestjs/graphql';
import { Post } from '../../entities';

@InputType()
export class ParentPostInput implements Partial<Post> {
  @Field(/* istanbul ignore next */ () => Int)
  id: number;
}
