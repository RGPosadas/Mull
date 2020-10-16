import { Field, ID, InputType } from '@nestjs/graphql';
import { User } from '../../entity';

@InputType()
export class CreateUserInput implements Partial<User> {
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
export class UpdateUserInput implements Partial<User> {
  @Field(/* istanbul ignore next */ () => ID)
  id: number;
  @Field({ nullable: true })
  age?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}
