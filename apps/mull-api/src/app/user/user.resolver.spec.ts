import { RegistrationMethod, RelationshipType } from '@mull/types';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockAllDirectMessageChannels } from '../channel/channel.mockdata';
import { ChannelService } from '../channel/channel.service';
import { mockAllEvents } from '../event/event.mockdata';
import { EventService } from '../event/event.service';
import { mockAllMedias, mockFileJPEG, mockFilePNG } from '../media/media.mockdata';
import { MediaService } from '../media/media.service';
import { mockAllPosts } from '../post/post.mockdata';
import { PostService } from '../post/post.service';
import { mockAllFriendsOfId1, mockAllFriendsOfId3 } from './friend.mockdata';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { Relationship } from './outputs/user.output';
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
  getFriends: jest.fn((id: number) =>
    id === 1 ? mockAllFriendsOfId1 : id === 3 ? mockAllFriendsOfId3 : []
  ),
  updateUser: jest.fn((userInput: UpdateUserInput) => {
    return mockExpectedUpdatedUser.find((user) => user.id === userInput.id);
  }),
  deleteUser: jest.fn((id: number) => mockAllUsers.find((user) => user.id === id)),
  addFriend: jest.fn((currentUserId: number, userIdToAdd: number) => {
    const userToAdd = mockAllUsers.find((user) => user.id === userIdToAdd);
    const currentUser = mockAllUsers.find((user) => user.id === currentUserId);
    currentUser.friends.push(userToAdd);
    return true;
  }),
  removeFriend: jest.fn(() => {
    return true;
  }),
  getRelationships: jest.fn((): Relationship[] => [
    { user: mockAllUsers[0], type: RelationshipType.FRIENDS },
  ]),
  getUserRelationship: jest.fn((): RelationshipType => RelationshipType.FRIENDS),
});

const mockEventService = () => ({
  getUserEventsPortfolio: jest.fn(() => [mockAllEvents[0], mockAllEvents[1]]),
  getEventsHostedByUser: jest.fn((id: number) => [
    mockAllEvents.find((event) => event.host.id === id),
  ]),
});

const mockMediaService = () => ({
  uploadFile: jest.fn(() => {
    return mockAllMedias[0];
  }),
  updateFile: jest.fn(() => {
    return mockAllMedias[1];
  }),
  deleteMedia: jest.fn(() => {
    return mockAllMedias[0];
  }),
});

const mockPostService = () => ({
  getLatestPost: jest.fn((channelId: number) =>
    mockAllPosts.find((post) => post.channel.id == channelId)
  ),
});

const mockChannelService = () => ({
  findDirectMessageChannelByUserIds: jest.fn((userId1: number, userId2: number) =>
    userId1 == mockAllUsers[0].id && userId2 == mockAllUsers[0].friends[0].id
      ? mockAllDirectMessageChannels[0]
      : null
  ),
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
        { provide: PostService, useFactory: mockPostService },
        { provide: ChannelService, useFactory: mockChannelService },
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
    const returnedUserFriends = await resolver.friends(mockAllUsers[0].id);
    expect(returnedUserFriends).toEqual(mockAllFriendsOfId1);
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
    expect(await resolver.friendCount(1)).toEqual(1);
  });

  it(`'should return the user's hosting count`, async () => {
    expect(await resolver.hostingCount(1)).toEqual(1);
  });

  it(`'should return the user's portfolio count`, async () => {
    expect(await resolver.portfolioCount(3)).toEqual(2);
  });

  it(`should add a friend`, async () => {
    expect(await resolver.addFriend(mockAllUsers[0].id, mockAllUsers[2].id)).toBeTruthy();
  });

  it(`should remove a friend`, async () => {
    expect(await resolver.removeFriend(mockAllUsers[0].id, mockAllUsers[2].id)).toBeTruthy();
  });

  it(`should remove a pending request`, async () => {
    expect(await resolver.removeFriend(mockAllUsers[0].id, mockAllUsers[2].id)).toBeTruthy();
  });

  it(`should return all of the relationships for a user`, async () => {
    expect(await resolver.getRelationships(mockAllUsers[0].id)).toEqual([
      { user: mockAllUsers[0], type: RelationshipType.FRIENDS },
    ]);
  });

  it(`should return the relationship between two users`, async () => {
    expect(await resolver.getUserRelationship(mockAllUsers[0].id, mockAllUsers[2].id)).toEqual(
      RelationshipType.FRIENDS
    );
  });

  it('should get true friends of user', async () => {
    const trueFriends = await resolver.getTrueFriends(mockAllUsers[0].id);
    expect(trueFriends).toEqual([mockAllFriendsOfId1[0]]);
  });
});
