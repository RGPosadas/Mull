import { UserType } from '@mull/types';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { User } from '../../entities';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  name: string;

  @Field({ nullable: true })
  password: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  dob: Date;

  @Field(() => Int)
  type: UserType;
}

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field(/* istanbul ignore next */ () => ID)
  id: number;
  @Field({ nullable: true })
  dob: Date;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}
