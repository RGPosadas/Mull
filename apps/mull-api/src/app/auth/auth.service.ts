import { RegistrationMethod } from '@mull/types';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { environment } from '../../environments/environment';
import { User } from '../entities';
import { CreateUserInput } from '../user/inputs/user.input';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  authLogin({ user }: Request, res: Response) {
    if (!user) return null;
    const accessToken = this.createAccessToken(user);
    this.sendRefreshToken(res, this.createRefreshToken(user));
    res.redirect(`${environment.client.baseUrl}/token-redirect/${accessToken}`);
  }

  async validateOAuthUser(
    user: Partial<User>,
    callback: (error: string, user?: Partial<User>, info?: string) => void
  ) {
    const users: User[] = await this.userService.findUnique(user.email, user.registrationMethod);
    if (users.length == 1) callback(null, users[0]);
    else {
      const newUser = await this.userService.createUser(user as CreateUserInput);
      callback(null, newUser);
    }
  }

  createAccessToken(user: Partial<User>) {
    return this.jwtService.sign(
      { id: user.id },
      { expiresIn: '15m', secret: environment.jwt.accessSecret }
    );
  }

  createRefreshToken(user: Partial<User>) {
    return this.jwtService.sign(
      { id: user.id, tokenVersion: user.tokenVersion },
      { expiresIn: '7d', secret: environment.jwt.refreshSecret }
    );
  }

  sendRefreshToken(res: Response, refreshToken: string) {
    res.cookie('mullToken', refreshToken, {
      maxAge: 7 * 24 * 3600 * 1000, // 7 days in ms
      secure: environment.production, // Determines if cookie is to be used with HTTPS only
    });
  }

  async revokeRefreshTokensForUser(userId: number): Promise<boolean> {
    return this.userService.incrementTokenVersion(userId);
  }

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user = await this.userService.findUnique(email, RegistrationMethod.LOCAL);
    if (user.length < 1) throw new NotFoundException('Invalid username or password');
    const validPassword = await compare(pass, user[0].password);
    if (validPassword) return user[0];
    throw new UnauthorizedException('Invalid username or password');
  }
}
