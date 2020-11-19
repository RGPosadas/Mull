import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { UserService } from '../user/user.service';
import { Request } from 'express';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  googleLogin(req: Request) {
    if (!req.user) return null;
    return { user: req.user };
  }

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user = await this.userService.findByEmail(email)[0];
    if (user && user.password === pass) {
      delete user.password;
      return user;
    }
    return null;
  }
}
