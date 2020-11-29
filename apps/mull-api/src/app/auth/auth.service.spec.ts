import { Test, TestingModule } from '@nestjs/testing';
import { mockAllUsers } from '../user/user.mockdata';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { User } from '../entities';
import { cloneDeep } from 'lodash';
import { CreateUserInput } from '../user/inputs/user.input';

const mockUserService = () => ({
  findByEmail: jest.fn((email: string) => {
    for (const mUser of mockAllUsers) {
      if (mUser.email === email) {
        return [cloneDeep(mUser)];
      }
    }
    return [];
  }),
  create: jest.fn((user: CreateUserInput) => user),
});

const mockCallback = jest.fn();

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: UserService, useFactory: mockUserService }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user', () => {
    const mockRequest = ({ user: mockAllUsers[0] } as unknown) as Request;
    const { user } = service.authLogin(mockRequest);
    expect(user).toEqual(mockAllUsers[0]);
  });

  it('should return null', () => {
    const mockRequest = ({} as unknown) as Request;
    const user = service.authLogin(mockRequest);
    expect(user).toBeNull;
  });

  it('should validate a user', async () => {
    const returnedUser: Partial<User> = await service.validateUser(mockAllUsers[0].email, 'abc123');
    const { password, ...rest } = mockAllUsers[0];
    expect(returnedUser).toEqual(rest);
  });

  it('should invalidate a password', async () => {
    const returnedUser: Partial<User> = await service.validateUser(
      mockAllUsers[0].email,
      'password'
    );
    expect(returnedUser).toBeNull;
  });

  it('should invalidate an email', async () => {
    const returnedUser: Partial<User> = await service.validateUser('test@test.co', 'password');
    expect(returnedUser).toBeNull;
  });

  it('should validate an oauth user', async () => {
    await service.validateOAuthUser(mockAllUsers[1], mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(null, mockAllUsers[1]);
  });

  it('should invalidate and create an oauth user', async () => {
    const newUser = { ...mockAllUsers[1] };
    newUser.email = 'ff@gg.ez';
    await service.validateOAuthUser(newUser, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(null, newUser);
  });
});
