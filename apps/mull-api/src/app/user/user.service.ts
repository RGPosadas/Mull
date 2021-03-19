import { RegistrationMethod } from '@mull/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['avatar'] });
  }

  getUser(id: number): Promise<User> {
    return this.userRepository.findOne(id, { relations: ['avatar', 'friends'] });
  }

  findByEmail(email: string): Promise<User[]> {
    return this.userRepository.find({ where: { email } });
  }

  findUnique(email: string, registrationMethod: RegistrationMethod): Promise<User[]> {
    return this.userRepository.find({ where: { email, registrationMethod } });
  }

  async getFriends(userId: number): Promise<User[]> {
    const { friends } = await this.userRepository.findOne(userId, { relations: ['friends'] });
    return friends;
  }

  async createUser(input: CreateUserInput): Promise<User> {
    if (input.registrationMethod === RegistrationMethod.LOCAL) {
      const salt = await genSalt(10);
      const hashed = await hash(input.password, salt);
      input.password = hashed;
    }
    const existingUser = await this.findUnique(input.email, input.registrationMethod);
    if (existingUser.length > 0)
      throw new UnauthorizedException('User with this email already exists.');
    return this.userRepository.save({ ...input });
  }

  async updateUser(userInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(userInput.id, { ...userInput });
    return this.getUser(userInput.id);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getUser(id);
    await this.userRepository.delete(user.id);
    return user;
  }

  async incrementTokenVersion(id: number): Promise<boolean> {
    await this.userRepository.increment({ id }, 'tokenVersion', 1);
    return true;
  }

  async addFriend(currentUserId: number, userIdToAdd: number): Promise<boolean> {
    const currentUser = await this.getUser(currentUserId);
    const userToAdd = await this.getUser(userIdToAdd);
    currentUser.friends.push(userToAdd);
    await this.userRepository.save(currentUser);
    return true;
  }
}
