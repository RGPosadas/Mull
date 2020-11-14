import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user = await this.userService.findByEmail(email)[0];
    if (user && user.password === pass) {
      delete user.password;
      return user;
    }
    return null;
  }
}
