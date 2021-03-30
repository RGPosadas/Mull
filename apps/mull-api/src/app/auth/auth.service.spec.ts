import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { User } from '../entities';
import { CreateUserInput } from '../user/inputs/user.input';
import { mockAllUsers } from '../user/user.mockdata';
import { UserService } from '../user/user.service';
import { MockType } from '../user/user.service.spec';
import { AuthService } from './auth.service';

const mockUserService = () => ({
  findUnique: jest.fn(),
  createUser: jest.fn((user: CreateUserInput) => user),
  incrementTokenVersion: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(),
});

const mockCallback = jest.fn();

describe('AuthService', () => {
  let service: AuthService;
  let userService: MockType<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useFactory: mockUserService },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user', () => {
    const mockRequest = ({ user: mockAllUsers[0] } as unknown) as Request;
    const mockResponse = ({ redirect: jest.fn(), cookie: jest.fn() } as unknown) as Response;
    service.authLogin(mockRequest, mockResponse);
    expect(mockResponse.redirect).toHaveBeenCalled();
    expect(mockResponse.cookie).toHaveBeenCalled();
  });

  it('should return null', () => {
    const mockRequest = ({} as unknown) as Request;
    const mockResponse = ({} as unknown) as Response;
    const user = service.authLogin(mockRequest, mockResponse);
    expect(user).toBeNull;
  });

  it('should validate a user', async () => {
    userService.findUnique.mockReturnValue([{ ...mockAllUsers[0] }]);
    const returnedUser: Partial<User> = await service.validateUser(mockAllUsers[0].email, 'abc123');
    expect(returnedUser).toEqual(mockAllUsers[0]);
  });

  it('should invalidate a password', async () => {
    userService.findUnique.mockReturnValue([{ ...mockAllUsers[0] }]);
    try {
      await service.validateUser(mockAllUsers[0].email, 'password');
    } catch (err) {
      if (err instanceof UnauthorizedException)
        expect(err.message).toBe('Invalid username or password');
    }
  });

  it('should invalidate an invalid access token', async () => {
    userService.findUnique.mockReturnValue([]);
    try {
      await service.validateUser(mockAllUsers[0].email, mockAllUsers[0].password);
    } catch (err) {
      if (err instanceof UnauthorizedException)
        expect(err.message).toBe('Invalid username or password');
    }
  });

  it('should invalidate an email', async () => {
    userService.findUnique.mockReturnValue([{ ...mockAllUsers[0] }]);
    try {
      await service.validateUser('test@test.co', 'password');
    } catch (err) {
      if (err instanceof UnauthorizedException)
        expect(err.message).toBe('Invalid username or password');
    }
  });

  it('should validate an oauth user', async () => {
    userService.findUnique.mockReturnValue([{ ...mockAllUsers[1] }]);
    await service.validateOAuthUser(mockAllUsers[1], mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(null, mockAllUsers[1]);
  });

  it('should invalidate and create an oauth user', async () => {
    const newUser = { ...mockAllUsers[1] };
    newUser.email = 'ff@gg.ez';
    userService.findUnique.mockReturnValue([]);
    await service.validateOAuthUser(newUser, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(null, newUser);
  });

  it('should clear refresh token', async () => {
    const mockResponse = ({ clearCookie: jest.fn() } as unknown) as Response;
    await service.clearRefreshToken(mockResponse);
    expect(mockResponse.clearCookie).toHaveBeenCalled();
  });

  it('should revoke an access token', async () => {
    userService.incrementTokenVersion.mockImplementation(() => {
      mockAllUsers[0].tokenVersion++;
      return true;
    });
    await service.revokeRefreshTokensForUser(mockAllUsers[0].id);
    expect(mockAllUsers[0].tokenVersion).toBe(1);
  });
});
