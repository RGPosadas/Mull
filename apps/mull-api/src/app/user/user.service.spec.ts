import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserInput } from './inputs/user.input';
import { mockAllUsers, mockPartialUser } from './user.mockdata';
import { FindOneOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

const mockUserRepositoy = () => ({
  create: jest.fn((mockUserData: CreateUserInput) => ({ ...mockUserData })),
  findOne: jest.fn((id: number, options?: FindOneOptions<User>) => {
    const foundUser = mockAllUsers.find((user) => user.id === id);
    if (options && 'friends' in options.relations) {
      return foundUser.friends;
    }
    return foundUser;
  }),
  find: jest.fn(() => mockAllUsers),
  update: jest.fn((id: number, partialEntitiy: QueryDeepPartialEntity<User>) =>
    mockAllUsers.find((user) => user.id === id)
  ),
  delete: jest.fn((id: number) => mockAllUsers.find((user) => user.id === id)),
  save: jest.fn((user: User) => user),
});

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepositoy,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const returnedUser = await service.create(mockPartialUser as CreateUserInput);
    expect(returnedUser).toEqual(mockPartialUser);
  });

  it('should fetch all users', async () => {
    const returnedUsers = await service.findAll();
    expect(returnedUsers).toEqual(mockAllUsers);
  });

  it('should fetch all friends of mockUser 1', async () => {
    const returnedUserFriends = await service.findAllFriends(1);
    expect(returnedUserFriends).toEqual(mockAllUsers.find((user) => user.id === 1).friends);
  });

  it('should update the user', async () => {
    const updatedUser = await service.updateUser(mockAllUsers[0]);
    expect(updatedUser).toEqual(mockAllUsers[0]);
  });

  it('should return the deleted user', async () => {
    const deletedUser = await service.delete(1);
    expect(deletedUser).toEqual(mockAllUsers.find((user) => user.id === 1));
  });

  it('should return the user with given id', async () => {
    const foundUser = await service.findOne(1);
    expect(foundUser).toEqual(mockAllUsers.find((user) => user.id === 1));
  });
});
