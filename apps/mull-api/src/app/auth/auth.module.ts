import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { LocalStrategy } from './local.strategy';
import { GoogleStrategy } from './google.strategy';
import { FacebookStrategy } from './facebook.strategy';
import { TwitterStrategy } from './twitter.strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, GoogleStrategy, FacebookStrategy, TwitterStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
