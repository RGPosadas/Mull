import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../entities';
import { CreateUserInput } from './inputs/user.input';
import { mockAllUsers, mockPartialUser } from './user.mockdata';
import { UserService } from './user.service';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<unknown>;
};

const mockUserRepository = () => ({
  create: jest.fn((mockUserData: CreateUserInput) => ({ ...mockUserData })),
  findOne: jest.fn((id: number, options?: FindOneOptions<User>) => {
    const foundUser = mockAllUsers.find((user) => user.id === id);
    if (options && 'friends' in options.relations) {
      return foundUser.friends;
    }
    return foundUser;
  }),
  find: jest.fn((options?: FindOneOptions<User>) => {
    if (options && options.where) {
      return [];
    }
    return mockAllUsers;
  }),
  update: jest.fn((id: number) => mockAllUsers.find((user) => user.id === id)),
  delete: jest.fn((id: number) => mockAllUsers.find((user) => user.id === id)),
  save: jest.fn((user: User) => user),
  increment: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repository: MockType<Repository<User>>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const originalUser = cloneDeep(mockPartialUser);
    const returnedUser = await service.createUser(mockPartialUser as CreateUserInput);
    expect(returnedUser.name).toEqual(originalUser.name);
    expect(returnedUser.email).toEqual(originalUser.email);
    expect(returnedUser.password).not.toEqual(originalUser.password);
  });

  it('should fetch all users', async () => {
    const returnedUsers = await service.getAllUsers();
    expect(returnedUsers).toEqual(mockAllUsers);
  });

  it('should fetch a user by email', async () => {
    repository.find.mockReturnValue(mockAllUsers[0]);
    const returnedUsers = await service.findByEmail(mockAllUsers[0].email);
    expect(returnedUsers).toEqual(mockAllUsers[0]);
  });

  it('should fetch a unique user', async () => {
    repository.find.mockReturnValue(mockAllUsers[0]);
    const returnedUsers = await service.findUnique(
      mockAllUsers[0].email,
      mockAllUsers[0].registrationMethod
    );
    expect(returnedUsers).toEqual(mockAllUsers[0]);
  });

  it('should fetch all friends of mockUser 1', async () => {
    const returnedUserFriends = await service.getFriends(1);
    expect(returnedUserFriends).toEqual(mockAllUsers.find((user) => user.id === 1).friends);
  });

  it('should update the user', async () => {
    const updatedUser = await service.updateUser(mockAllUsers[0]);
    expect(updatedUser).toEqual(mockAllUsers[0]);
  });

  it('should return the deleted user', async () => {
    const deletedUser = await service.deleteUser(1);
    expect(deletedUser).toEqual(mockAllUsers.find((user) => user.id === 1));
  });

  it('should return the user with given id', async () => {
    const foundUser = await service.getUser(1);
    expect(foundUser).toEqual(mockAllUsers.find((user) => user.id === 1));
  });

  it('should increment the token version', async () => {
    repository.increment.mockImplementation(() => {
      mockAllUsers[0].tokenVersion++;
      return true;
    });
    await service.incrementTokenVersion(1);
    expect(mockAllUsers[0].tokenVersion).toBe(1);
  });

  it('should add a friend', async () => {
    expect(await service.addFriend(mockAllUsers[0].id, mockAllUsers[2].id)).toBeTruthy();
  });

  it('should return UnprocessableEntityException when adding yourself as friend', async () => {
    expect(
      async () => await service.addFriend(mockAllUsers[0].id, mockAllUsers[0].id)
    ).rejects.toThrow(UnprocessableEntityException);
  });
});
