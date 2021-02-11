import { RegistrationMethod } from '@mull/types';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockAllEvents } from '../event/event.mockdata';
import { EventService } from '../event/event.service';
import { mockFileJPEG, mockFilePNG } from '../media/media.mockdata';
import { MediaService } from '../media/media.service';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import {
  mockAllUsers,
  mockExpectedUpdatedUser,
  mockNewPartialUser,
  mockPartialUser,
  mockUpdateUserInput,
} from './user.mockdata';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const mockUserService = () => ({
  createUser: jest.fn((mockUserData: CreateUserInput) => ({ ...mockUserData })),
  getUser: jest.fn((id: number) => mockAllUsers.find((user) => user.id === id)),
  getAllUsers: jest.fn(() => mockAllUsers),
  findUnique: jest.fn((email: string, registrationMethod: RegistrationMethod) => {
    return Promise.resolve(
      mockAllUsers.filter((u) => u.email === email && u.registrationMethod === registrationMethod)
    );
  }),
  getFriends: jest.fn((id: number) => mockAllUsers.find((user) => user.id === id).friends),
  updateUser: jest.fn((userInput: UpdateUserInput) => {
    return mockExpectedUpdatedUser.find((user) => user.id === userInput.id);
  }),
  deleteUser: jest.fn((id: number) => mockAllUsers.find((user) => user.id === id)),
});

const mockEventService = () => ({
  getUserEventsPortfolio: jest.fn(() => [mockAllEvents[0], mockAllEvents[1]]),
  getEventsHostedByUser: jest.fn((id: number) => [
    mockAllEvents.find((event) => event.host.id === id),
  ]),
});

const mockMediaService = () => ({
  uploadFile: jest.fn(() => {
    return {
      id: 1,
      mediaType: 'jpeg',
      post: null,
    };
  }),
  updateFile: jest.fn(() => {
    return {
      id: 2,
      mediaType: 'png',
      post: null,
    };
  }),
});

describe('UserResolver', () => {
  let resolver: UserResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UserService, useFactory: mockUserService },
        { provide: EventService, useFactory: mockEventService },
        { provide: MediaService, useFactory: mockMediaService },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should create a local user', async () => {
    const returnedUser = await resolver.createUser({ ...mockNewPartialUser });
    expect(returnedUser).toEqual(mockNewPartialUser);
  });

  it('should not create a local user', async () => {
    try {
      await resolver.createUser({ ...mockPartialUser } as CreateUserInput);
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        expect(err.message).toBe('User with this email already exists.');
      }
    }
  });

  it('should create an OAuth user', async () => {
    const returnedUser = await resolver.createUser({
      ...mockNewPartialUser,
      registrationMethod: RegistrationMethod.GOOGLE,
    });
    expect(returnedUser.name).toEqual(mockNewPartialUser.name);
    expect(returnedUser.email).toEqual(mockNewPartialUser.email);
    expect(returnedUser.password).toEqual(mockNewPartialUser.password);
  });

  it('should fetch all users', async () => {
    const returnedUsers = await resolver.users();
    expect(returnedUsers).toEqual(mockAllUsers);
  });

  it('should fetch all friends of mockUser 1', async () => {
    const returnedUserFriends = await resolver.friends(mockAllUsers[0]);
    expect(returnedUserFriends).toEqual(mockAllUsers[0].friends);
  });

  it('should update the user and upload a new avatar', async () => {
    const updatedUser = await resolver.updateUser(mockUpdateUserInput[0], mockFileJPEG);
    expect(updatedUser).toEqual(mockExpectedUpdatedUser[0]);
  });

  it('should update the user and update its avatar', async () => {
    const updatedUser = await resolver.updateUser(mockUpdateUserInput[1], mockFilePNG);
    expect(updatedUser).toEqual(mockExpectedUpdatedUser[1]);
  });

  it('should return the deleted user', async () => {
    const deletedUser = await resolver.deleteUser(1);
    expect(deletedUser).toEqual(mockAllUsers.find((user) => user.id === 1));
  });

  it('should return the user with given id', async () => {
    const foundUser = await resolver.user(1);
    expect(foundUser).toEqual(mockAllUsers.find((user) => user.id === 1));
  });

  it(`'should return the user's friend count`, async () => {
    expect(await resolver.friendCount(1)).toEqual(2);
  });

  it(`'should return the user's hosting count`, async () => {
    expect(await resolver.hostingCount(1)).toEqual(1);
  });

  it(`'should return the user's portfolio count`, async () => {
    expect(await resolver.portfolioCount(3)).toEqual(2);
  });
});
