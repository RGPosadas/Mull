import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { mockPartialUser, mockAllUsers } from './user.mockdata';

const mockUserService = () => ({
  create: jest.fn((mockUserData: CreateUserInput) => ({ ...mockUserData })),
  findOne: jest.fn((id: number) => mockAllUsers.find((user) => user.id === id)),
  findAll: jest.fn(() => mockAllUsers),
  findAllFriends: jest.fn((id: number) => mockAllUsers.find((user) => user.id === id).friends),
  updateUser: jest.fn((mockUserData: UpdateUserInput) => ({ ...mockUserData })),
  delete: jest.fn((id: number) => mockAllUsers.find((user) => user.id === id)),
});

describe('UserResolver', () => {
  let resolver: UserResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useFactory: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should create user', async () => {
    const returnedUser = await resolver.createUser(mockPartialUser as CreateUserInput);
    expect(returnedUser).toEqual(mockPartialUser);
  });

  it('should fetch all users', async () => {
    const returnedUsers = await resolver.users();
    expect(returnedUsers).toEqual(mockAllUsers);
  });

  it('should fetch all friends of mockUser 1', async () => {
    const returnedUserFriends = await resolver.friends(mockAllUsers[0]);
    expect(returnedUserFriends).toEqual(mockAllUsers[0].friends);
  });

  it('should update the user', async () => {
    const updatedUser = await resolver.updateUser(mockPartialUser as UpdateUserInput);
    expect(updatedUser).toEqual(mockPartialUser);
  });

  it('should return the deleted user', async () => {
    const deletedUser = await resolver.deleteUser(1);
    expect(deletedUser).toEqual(mockAllUsers.find((user) => user.id === 1));
  });

  it('should return the user with given id', async () => {
    const foundUser = await resolver.user(1);
    expect(foundUser).toEqual(mockAllUsers.find((user) => user.id === 1));
  });
});
