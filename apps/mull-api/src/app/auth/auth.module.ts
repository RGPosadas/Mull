import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, GoogleStrategy, FacebookStrategy, TwitterStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
