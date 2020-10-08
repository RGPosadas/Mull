import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async getUsers(user: User): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(_id: number): Promise<User> {
    return await this.usersRepository.findOne(_id);
  }

  async createUser(user: User) {
    await this.usersRepository.save(user);
    return 'done';
  }

  async updateUser(user: User) {
    this.usersRepository.save(user);
  }

  async deleteUser(user: User) {
    this.usersRepository.delete(user);
  }
}
