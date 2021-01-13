import { RegistrationMethod } from '@mull/types';
import { UnauthorizedException } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { genSalt, hash } from 'bcrypt';
import { User } from '../entities';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { UserService } from './user.service';

@Resolver(/* istanbul ignore next */ () => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(/* istanbul ignore next */ () => [User])
  async users() {
    return this.userService.users();
  }

  @Query(/* istanbul ignore next */ () => User)
  async user(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.userService.user(id);
  }

  @ResolveField(/* istanbul ignore next */ () => [User])
  async friends(@Parent() user: User) {
    const { id } = user;
    return this.userService.friends(id);
  }

  @Mutation(/* istanbul ignore next */ () => User)
  async createUser(@Args('input') input: CreateUserInput) {
    if (input.registrationMethod === RegistrationMethod.LOCAL) {
      const salt = await genSalt(10);
      const hashed = await hash(input.password, salt);
      input.password = hashed;
    }
    const existingUser = await this.userService.findUnique(input.email, input.registrationMethod);
    if (existingUser.length > 0)
      throw new UnauthorizedException('User with this email already exists.');
    return this.userService.createUser(input);
  }

  @Mutation(/* istanbul ignore next */ () => User)
  async updateUser(@Args('input') input: UpdateUserInput) {
    return this.userService.updateUser(input);
  }

  @Mutation(/* istanbul ignore next */ () => User)
  async deleteUser(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.userService.deleteUser(id);
  }
}
