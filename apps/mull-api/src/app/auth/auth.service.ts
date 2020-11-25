import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { Request } from 'express';

import { User } from '../entities';
import { CreateUserInput } from '../user/inputs/user.input';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const users: User[] = await this.userService.findByEmail(email);
    if (users && users.length === 1) {
      const validPassword = await compare(pass, users[0].password);
      if (validPassword) {
        delete users[0].password;
        return users[0];
      }
    }
    return null;
  }
}
