import { RegistrationMethod } from '@mull/types';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOption, Profile, Strategy } from 'passport-twitter';
import { environment } from '../../../environments/environment';
import { User } from '../../entities';
import { AuthService } from './../auth.service';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private authService: AuthService) {
    super({
      consumerKey: environment.auth.twitter.consumerId,
      consumerSecret: environment.auth.twitter.consumerSecret,
      callbackURL: environment.backend.url + '/api/auth/twitter/redirect',
      includeEmail: true,
    } as IStrategyOption);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: string, user?: Partial<User>) => void
  ): Promise<void> {
    const { username, emails } = profile;
    const user: Partial<User> = {
      name: username,
      email: emails[0].value,
      registrationMethod: RegistrationMethod.TWITTER,
      joinDate: new Date(),
    };
    await this.authService.validateOAuthUser(user, done);
  }
}
