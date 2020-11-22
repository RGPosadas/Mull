import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-twitter';
import { environment } from '../../environments/environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      consumerKey: environment.auth.twitter.consumerId,
      consumerSecret: environment.auth.twitter.consumerSecret,
      callbackURL: 'http://localhost:3333/api/auth/twitter/redirect',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, cb): Promise<void> {
    const { username } = profile;
    const user = {
      username,
      accessToken,
    };
    cb(null, user);
  }
}
