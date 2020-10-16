import { Resolver, Query, Mutation, Args, ResolveField, Parent, Int } from '@nestjs/graphql';
import { User } from '../entity';
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
