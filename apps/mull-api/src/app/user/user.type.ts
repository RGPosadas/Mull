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

  @Field()
  name: string;

  @Field()
  age: string;

  @Field()
  description: string;

  @Field(() => [UserType])
  friends: UserType[];

  // TODO: Implement modules, services, types for Entities below

  //   @Field(() => [EventType])
  //   events: EventType[];

  //   @Field(() => [PostReactionType])
  //   postReactions: PostReactionType[];

  //   @Field(() => MediaType)
  //   avatar: MediaType;
}
