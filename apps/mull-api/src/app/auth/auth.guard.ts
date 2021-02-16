import { IAuthToken } from '@mull/types';
import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const accessToken = context.switchToHttp().getNext().req.headers.authorization.split(' ')[1];
      return !!jwt.verify(accessToken, environment.jwt.accessSecret);
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}

export const AuthenticatedUser = createParamDecorator((_, context: ExecutionContext): number => {
  try {
    const accessToken = context.switchToHttp().getNext().req.headers.authorization.split(' ')[1];
    const { id } = jwt.verify(accessToken, environment.jwt.accessSecret) as IAuthToken;
    return id;
  } catch (err) {
    throw new UnauthorizedException('Unauthorized');
  }
});

export const authenticatedSubscription = (authToken) => {
  try {
    jwt.verify(authToken, environment.jwt.accessSecret);
    console.log('try');
    return true;
  } catch (err) {
    throw new UnauthorizedException('Unauthorized 123');
  }
};
