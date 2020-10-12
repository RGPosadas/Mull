import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  timezone: string;

  //   @Field(() => MediaType)
  //   avatar: MediaType;

  @Field()
  name: string;

  @Field()
  age: string;

  @Field()
  description: string;

  @Field(() => [UserType])
  friends: UserType[];

  //   @Field(() => [EventType])
  //   events: EventType[];

  //   @Field(() => [PostReactionType])
  //   postReactions: PostReactionType[];
}
