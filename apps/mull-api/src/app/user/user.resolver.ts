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
    return this.userService.findAll();
  }

  @Query(/* istanbul ignore next */ () => User)
  async user(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @ResolveField(/* istanbul ignore next */ () => [User])
  async friends(@Parent() user: User) {
    const { id } = user;
    return this.userService.findAllFriends(id);
  }

  @Mutation(/* istanbul ignore next */ () => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    if (createUserInput.registrationMethod === RegistrationMethod.LOCAL) {
      const salt = await genSalt(10);
      const hashed = await hash(createUserInput.password, salt);
      createUserInput.password = hashed;
    }
    const existingUser = await this.userService.findUnique(
      createUserInput.email,
      createUserInput.registrationMethod
    );
    if (existingUser.length > 0)
      throw new UnauthorizedException('User with this email already exists.');
    return this.userService.create(createUserInput);
  }

  @Mutation(/* istanbul ignore next */ () => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput);
  }

  @Mutation(/* istanbul ignore next */ () => User)
  async deleteUser(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.userService.delete(id);
  }
}
