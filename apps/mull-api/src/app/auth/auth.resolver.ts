import { Args, Context, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';

import { LoginInput } from './inputs/auth.input';
import { GqlContext } from '@mull/types';

@ObjectType()
export class LoginResult {
  @Field()
  accessToken: string;
}

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResult)
  async login(
    @Args('loginInput') { email, password }: LoginInput,
    @Context() { res }: GqlContext
  ): Promise<LoginResult> {
    const existingUser = await this.authService.validateUser(email, password);
    this.authService.sendRefreshToken(res, this.authService.createRefreshToken(existingUser));
    return { accessToken: this.authService.createAccessToken(existingUser) };
  }
}
