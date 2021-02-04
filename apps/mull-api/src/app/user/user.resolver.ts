import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthenticatedUser, AuthGuard } from '../auth/auth.guard';
import { User } from '../entities';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { UserService } from './user.service';

@Resolver(/* istanbul ignore next */ () => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(/* istanbul ignore next */ () => [User])
  @UseGuards(AuthGuard)
  async users() {
    return this.userService.getAllUsers();
  }

  @Query(/* istanbul ignore next */ () => User)
  async user(@AuthenticatedUser() id: number) {
    return this.userService.getUser(id);
  }

  @ResolveField(/* istanbul ignore next */ () => [User])
  async friends(@Parent() user: User) {
    const { id } = user;
    return this.userService.getFriends(id);
  }

  @Mutation(/* istanbul ignore next */ () => User)
  @UseGuards(AuthGuard)
  async createUser(@Args('user') user: CreateUserInput) {
    return this.userService.createUser(user);
  }

  @Mutation(/* istanbul ignore next */ () => User)
  @UseGuards(AuthGuard)
  async updateUser(@Args('user') user: UpdateUserInput) {
    return this.userService.updateUser(user);
  }

  @Mutation(/* istanbul ignore next */ () => User)
  async deleteUser(@AuthenticatedUser() id: number) {
    return this.userService.deleteUser(id);
  }
}
