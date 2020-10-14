import { Resolver, Query, Mutation, Args, ResolveField, Parent, Int } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { UserService } from './user.service';
import { UserType } from './user.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(/* istanbul ignore next */ () => [UserType])
  async users() {
    return this.userService.findAll();
  }

  @Query(/* istanbul ignore next */ () => UserType)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @ResolveField(/* istanbul ignore next */ () => [UserType])
  async friends(@Parent() user: UserType) {
    const { id } = user;
    return this.userService.findAllFriends(id);
  }

  @Mutation(/* istanbul ignore next */ () => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(/* istanbul ignore next */ () => UserType)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput);
  }

  @Mutation(/* istanbul ignore next */ () => UserType)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.delete(id);
  }
}
