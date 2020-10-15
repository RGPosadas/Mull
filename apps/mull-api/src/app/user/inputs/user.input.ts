import { Field, ID, InputType } from '@nestjs/graphql';
import { UserType } from '../../types/user.type';

@InputType()
export class CreateUserInput implements Partial<UserType> {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  age: string;
}

@InputType()
export class UpdateUserInput implements Partial<UserType> {
  @Field(/* istanbul ignore next */ () => ID)
  id: number;
  @Field({ nullable: true })
  age?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}
