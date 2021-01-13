import { RegistrationMethod } from '@mull/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  users(): Promise<User[]> {
    return this.userRepository.find();
  }

  user(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User[]> {
    return this.userRepository.find({ where: { email } });
  }

  findUnique(email: string, registrationMethod: RegistrationMethod): Promise<User[]> {
    return this.userRepository.find({ where: { email, registrationMethod } });
  }

  async friends(userId: number): Promise<User[]> {
    const { friends } = await this.userRepository.findOne(userId, { relations: ['friends'] });
    return friends;
  }

  async createUser(userInput: CreateUserInput): Promise<User> {
    return await this.userRepository.save({ ...userInput });
  }

  async updateUser(userInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(userInput.id, { ...userInput });
    return this.user(userInput.id);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.user(id);
    await this.userRepository.delete(user.id);
    return user;
  }

  async incrementTokenVersion(id: number): Promise<boolean> {
    await this.userRepository.increment({ id }, 'tokenVersion', 1);
    return true;
  }
}
