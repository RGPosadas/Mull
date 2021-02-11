import { RegistrationMethod } from '@mull/types';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOption } from 'passport-facebook';
import { environment } from '../../../environments/environment';
import { User } from '../../entities';
import { AuthService } from './../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private authService: AuthService) {
    super({
      clientID: environment.auth.facebook.clientId,
      clientSecret: environment.auth.facebook.clientSecret,
      callbackURL: environment.backend.url + '/api/auth/facebook/redirect',
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
    const { first_name, last_name, email } = profile._json;
    const user: Partial<User> = {
      name: `${first_name} ${last_name}`,
      email: email,
      registrationMethod: RegistrationMethod.FACEBOOK,
      joinDate: new Date(),
    };
    await this.authService.validateOAuthUser(user, done);
  }
}
