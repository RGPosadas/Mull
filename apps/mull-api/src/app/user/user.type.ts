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

  //   @Field(() => Media)
  //   avatar: Media;

  @Field()
  name: string;

  @Field()
  age: string;

  @Field()
  description: string;

  @Field(() => [UserType])
  friends: UserType[];

  //   @Field(() => [Event])
  //   events: Event[];

  //   @Field(() => [PostReaction])
  //   postReactions: PostReaction[];
}
