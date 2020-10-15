import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity';
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

  async findAllFriends(id: number): Promise<User[]> {
    const { friends } = await this.userRepository.findOne(id, { relations: ['friends'] });
    return friends;
  }

  async create(userInput: CreateUserInput): Promise<User> {
    const { age, name, email, password } = userInput;
    const newUser = this.userRepository.create({ name, age, email, password });
    await this.userRepository.save(newUser);
    return newUser;
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
