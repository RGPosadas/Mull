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

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User[]> {
    return this.userRepository.find({ where: { email } });
  }

  findUnique(email: string, registrationMethod: RegistrationMethod): Promise<User[]> {
    return this.userRepository.find({ where: { email, registrationMethod } });
  }

  async findAllFriends(id: number): Promise<User[]> {
    const { friends } = await this.userRepository.findOne(id, { relations: ['friends'] });
    return friends;
  }

  async create(userInput: CreateUserInput): Promise<User> {
    return await this.userRepository.save({ ...userInput });
  }

  async updateUser(userInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(userInput.id, { ...userInput });
    return this.findOne(userInput.id);
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.delete(user.id);
    return user;
  }
}
