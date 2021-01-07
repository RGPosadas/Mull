import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  providers: [AuthService, GoogleStrategy, FacebookStrategy, TwitterStrategy, AuthResolver],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
