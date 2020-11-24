import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOption } from 'passport-facebook';
import { environment } from '../../environments/environment';
import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { AuthService } from './auth.service';
import { UserType } from '@mull/types';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private authService: AuthService) {
    super({
      clientID: environment.auth.facebook.clientId,
      clientSecret: environment.auth.facebook.clientSecret,
      callbackURL: 'http://localhost:3333/api/auth/facebook/redirect',
      profileFields: ['emails', 'name'],
      scope: ['email'],
    } as StrategyOption);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: string, user?: Partial<User>, info?: unknown) => void
  ): Promise<void> {
    // Facebook provides variables that are not camelcase
    /* eslint-disable @typescript-eslint/camelcase */
    const { first_name, last_name, email } = profile._json;
    const user: Partial<User> = {
      name: `${first_name} ${last_name}`,
      email: email,
      type: UserType.FACEBOOK,
    };
    await this.authService.validateOAuthUser(user, done);
  }
}
