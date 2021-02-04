import { GqlContext, IAuthToken } from '@mull/types';
import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const accessToken = ctx.getContext<GqlContext>().req.headers.authorization.split(' ')[1];
    try {
      return !!jwt.verify(accessToken, environment.jwt.accessSecret);
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}

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
