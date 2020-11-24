import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOptions, VerifyCallback } from 'passport-google-oauth20';
import { environment } from '../../environments/environment';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../entities';
import { RegistrationMethod } from '@mull/types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: environment.auth.google.clientId,
      clientSecret: environment.auth.google.clientSecret,
      callbackURL: 'http://localhost:3333/api/auth/google/redirect',
      scope: ['email', 'profile'],
    } as StrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void> {
    const { name, emails } = profile;
    const user: Partial<User> = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      registrationMethod: RegistrationMethod.GOOGLE,
    };
    await this.authService.validateOAuthUser(user, done);
  }
}
