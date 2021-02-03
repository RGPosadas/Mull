import { GqlContext, IAuthToken } from '@mull/types';
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt from 'jsonwebtoken';
import { environment } from '../../environments/environment';

export const AuthenticatedUser = createParamDecorator((_, context: ExecutionContext): number => {
  const ctx = GqlExecutionContext.create(context);
  const accessToken = ctx.getContext<GqlContext>().req.headers.authorization.split(' ')[1];
  try {
    const { id } = jwt.verify(accessToken, environment.jwt.accessSecret) as IAuthToken;
    return id;
  } catch (err) {
    throw new UnauthorizedException('Unauthorized');
  }
});
