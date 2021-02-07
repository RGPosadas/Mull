import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthenticatedUser, AuthGuard } from '../auth/auth.guard';
import { User } from '../entities';
import { EventService } from '../event/event.service';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { UserService } from './user.service';

@Resolver(/* istanbul ignore next */ () => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly eventService: EventService
  ) {}

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

  @Query(/* istanbul ignore next */ () => Int)
  async friendCount(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return (await this.userService.getFriends(id)).length;
  }

  @Query(/* istanbul ignore next */ () => Int)
  async hostingCount(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return (await this.eventService.getEventsHostedByUser(id)).length;
  }

  @Query(/* istanbul ignore next */ () => Int)
  async portfolioCount(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return (await this.eventService.getUserEventsPortfolio(id)).length;
  }
}
