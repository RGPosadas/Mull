import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { environment } from '../../environments/environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: environment.auth.facebook.clientId,
      clientSecret: environment.auth.facebook.clientSecret,
      callbackURL: 'http://localhost:3333/api/auth/facebook/redirect',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: unknown, user?: unknown, info?: unknown) => void
  ): Promise<void> {
    const { displayName } = profile;
    console.log(profile);
    const user = {
      displayName,
      accessToken,
    };
    done(null, user);
  }
}
