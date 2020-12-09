import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOption, Profile, Strategy } from 'passport-twitter';
import { environment } from '../../../environments/environment';
import { Injectable } from '@nestjs/common';
import { User } from '../../entities';
import { AuthService } from './../auth.service';
import { RegistrationMethod } from '@mull/types';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private authService: AuthService) {
    super({
      consumerKey: environment.auth.twitter.consumerId,
      consumerSecret: environment.auth.twitter.consumerSecret,
      callbackURL: 'http://localhost:3333/api/auth/twitter/redirect',
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
    };
    await this.authService.validateOAuthUser(user, done);
  }
}
