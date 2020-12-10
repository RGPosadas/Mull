import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Request } from 'express';

import { environment } from '../../environments/environment';
import { RegistrationMethod } from '@mull/types';
import { User } from '../entities';
import { CreateUserInput } from '../user/inputs/user.input';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  authLogin(req: Request) {
    if (!req.user) return null;
    return { user: req.user };
  }

  async validateOAuthUser(
    user: Partial<User>,
    callback: (error: string, user?: Partial<User>, info?: string) => void
  ) {
    const users: User[] = await this.userService.findByEmail(user.email);
    let hasSameRegistrationMethod = false;
    if (users.length >= 1) {
      users.forEach(({ registrationMethod }: Partial<User>, idx) => {
        if (user.registrationMethod === registrationMethod) {
          hasSameRegistrationMethod = true;
          callback(null, users[idx]);
        }
      });
    }
    if (!hasSameRegistrationMethod) {
      const newUser = await this.userService.create(user as CreateUserInput);
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
      { id: user.id },
      { expiresIn: '7d', secret: environment.jwt.refreshSecret }
    );
  }

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user = await this.userService.findUnique(email, RegistrationMethod.LOCAL);
    if (user.length < 1) throw new NotFoundException('Invalid username or password');
    const validPassword = await compare(pass, user[0].password);
    if (validPassword) return user[0];
    throw new UnauthorizedException('Invalid username or password');
  }
}
