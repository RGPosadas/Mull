import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Args, Context, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { compare } from 'bcrypt';

import { UserService } from '../user';
import { AuthService } from './auth.service';

import { LoginInput } from './inputs/auth.input';
import { GqlContext } from '@mull/types';
import { environment } from '../../environments/environment';

@ObjectType()
export class LoginResult {
  @Field()
  accessToken: string;
}

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Mutation(() => LoginResult)
  async login(
    @Args('loginInput') { email, password }: LoginInput,
    @Context() ctx: GqlContext
  ): Promise<LoginResult> {
    const existingUser = await this.authService.validateUser(email, password);
    ctx.res.cookie('mullToken', this.authService.createRefreshToken(existingUser), {
      maxAge: 7 * 24 * 3600 * 1000,
      secure: environment.production,
    });
    return { accessToken: this.authService.createAccessToken(existingUser) };
  }
}
