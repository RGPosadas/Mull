import { RegistrationMethod } from '@mull/types';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../entities';

@InputType()
export class UserInput implements Partial<User> {
  @Field(/* istanbul ignore next */ () => Int)
  id: number;
}

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  dob: Date;

  @Field(() => RegistrationMethod)
  registrationMethod: RegistrationMethod;
}

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field(/* istanbul ignore next */ () => Int)
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  dob: Date;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
}
