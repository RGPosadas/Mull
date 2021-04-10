import { RegistrationMethod, RelationshipType } from '@mull/types';
import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { setDifference, setIntersection } from '../utilities';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { Relationship } from './outputs/user.output';

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
    return this.userRepository.findOne(id, { relations: ['avatar', 'friends', 'friends.avatar'] });
  }

  findByEmail(email: string): Promise<User[]> {
    return this.userRepository.find({ where: { email } });
  }

  findUnique(email: string, registrationMethod: RegistrationMethod): Promise<User[]> {
    return this.userRepository.find({ where: { email, registrationMethod } });
  }

  async getFriends(userId: number): Promise<User[]> {
    const { friends } = await this.userRepository.findOne(userId, {
      relations: ['friends', 'friends.friends', 'friends.avatar'],
    });
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
    if (currentUserId === userIdToAdd) {
      throw new UnprocessableEntityException('Cannot add oneself as friend.');
    }

    const currentUser = await this.getUser(currentUserId);
    const userToAdd = await this.getUser(userIdToAdd);
    currentUser.friends.push(userToAdd);
    await this.userRepository.save(currentUser);
    return true;
  }

  async removeFriend(currentUserId: number, userIdToRemove: number): Promise<boolean> {
    if (currentUserId === userIdToRemove) {
      throw new UnprocessableEntityException('Cannot remove oneself as friend.');
    }

    const currentUser = await this.getUser(currentUserId);
    currentUser.friends = currentUser.friends.filter((friend) => friend.id !== userIdToRemove);

    await this.userRepository.save(currentUser);
    return true;
  }

  async getRelationships(id: number): Promise<Relationship[]> {
    // With this, we get the people current user added
    const currentUser = await this.getUser(id);

    // With this, we get the people who added the current user
    const addedCurrentUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .innerJoin('friends', 'friends', 'friends.adder = user.id')
      .where('friends.added = :id', { id })
      .getMany();

    const users = new Map<number, User>();
    const addedByMe = new Set<number>();
    let addedMe = new Set<number>();

    currentUser.friends.forEach((user) => {
      users.set(user.id, user);
      addedByMe.add(user.id);
    });

    addedCurrentUser.forEach((user) => {
      users.set(user.id, user);
      addedMe.add(user.id);
    });

    const friends = setIntersection(addedByMe, addedMe); // A -> B && B -> A
    const pendingRequests = setDifference(addedByMe, addedMe); // A -> B
    addedMe = setDifference(addedMe, addedByMe); // B -> A

    const relationships: Relationship[] = [];

    friends.forEach((id) => {
      relationships.push({ user: users.get(id), type: RelationshipType.FRIENDS });
    });

    pendingRequests.forEach((id) => {
      relationships.push({ user: users.get(id), type: RelationshipType.PENDING_REQUEST });
    });

    addedMe.forEach((id) => {
      relationships.push({ user: users.get(id), type: RelationshipType.ADDED_ME });
    });

    return relationships;
  }

  async getStrangers(id: number, searchInput: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoin('friends', 'f1', 'f1.adder = user.id')
      .leftJoin('friends', 'f2', 'f2.added = user.id')
      .where(
        `(f1.adder <> :id OR f1.adder IS NULL) 
      AND (f1.added <> :id OR f1.added IS NULL) 
      AND (f2.adder <> :id OR f2.adder IS NULL) 
      AND (f2.added <> :id OR f2.added IS NULL)
       AND INSTR(user.name, :searchInput) > 0`,
        { id, searchInput }
      )
      .getMany();
  }

  /**
   * Function returns the relationship between two users.
   *
   * @param userIdA
   * @param userIdB
   * @returns
   */
  async getUserRelationship(userIdA: number, userIdB: number): Promise<RelationshipType> {
    const userAFriends = await this.getFriends(userIdA);
    const userBFriends = await this.getFriends(userIdB);

    const AaddedB = !!userAFriends.find((friend) => userIdB === friend.id);
    const BaddedA = !!userBFriends.find((friend) => userIdA === friend.id);

    if (AaddedB && BaddedA) {
      return RelationshipType.FRIENDS;
    } else if (AaddedB) {
      return RelationshipType.PENDING_REQUEST;
    } else if (BaddedA) {
      return RelationshipType.ADDED_ME;
    } else {
      return RelationshipType.NONE;
    }
  }
}
