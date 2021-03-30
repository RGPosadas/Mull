import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { UserService } from '../user';
import { mockAllUsers } from '../user/user.mockdata';
import { MockType } from '../user/user.service.spec';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockAuthService = () => ({
  authLogin: jest.fn((req: Request) => {
    if (!req.user) return null;
    return { user: req.user };
  }),
  sendRefreshToken: jest.fn(),
  clearRefreshToken: jest.fn(),
  createRefreshToken: jest.fn(),
  createAccessToken: jest.fn(),
});

const mockUserService = () => ({
  getUser: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(),
  verify: jest.fn(),
});

describe('Auth Controller', () => {
  let controller: AuthController;
  let authService: MockType<AuthService>;
  let userService: MockType<UserService>;
  let jwtService: MockType<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useFactory: mockAuthService },
        { provide: JwtService, useFactory: mockJwtService },
        { provide: UserService, useFactory: mockUserService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a user', () => {
    const mockRequest = ({ user: mockAllUsers[0] } as unknown) as Request;
    const mockResponse = ({} as unknown) as Response;
    const ggResult = controller.googleAuthRedirect(mockRequest, mockResponse);
    const fbResult = controller.facebookAuthRedirect(mockRequest, mockResponse);
    const twResult = controller.twitterAuthRedirect(mockRequest, mockResponse);
    expect(ggResult).toEqual(mockRequest);
    expect(fbResult).toEqual(mockRequest);
    expect(twResult).toEqual(mockRequest);
  });

  it('should return null', () => {
    const mockRequest = ({} as unknown) as Request;
    const mockResponse = ({} as unknown) as Response;
    const ggResult = controller.googleAuthRedirect(mockRequest, mockResponse);
    const fbResult = controller.facebookAuthRedirect(mockRequest, mockResponse);
    const twResult = controller.twitterAuthRedirect(mockRequest, mockResponse);
    expect(ggResult).toBeNull;
    expect(fbResult).toBeNull;
    expect(twResult).toBeNull;
  });

  it('should call the functions', () => {
    let functionSpy = jest.spyOn(controller, 'googleAuth');
    controller.googleAuth();
    expect(functionSpy).toBeCalled();
    functionSpy = jest.spyOn(controller, 'facebookAuth');
    controller.facebookAuth();
    expect(functionSpy).toBeCalled();
    functionSpy = jest.spyOn(controller, 'twitterAuth');
    controller.twitterAuth();
    expect(functionSpy).toBeCalled();
  });

  it('should refresh an access token', async () => {
    const mockRequest = ({ cookies: { mullToken: 'mockRefreshAccess' } } as unknown) as Request;
    const mockResponse = ({ send: jest.fn() } as unknown) as Response;
    jwtService.verify.mockReturnValue({
      id: mockAllUsers[0].id,
      tokenVersion: mockAllUsers[0].tokenVersion,
    });
    userService.getUser.mockReturnValue({ ...mockAllUsers[0] });
    authService.createAccessToken.mockReturnValue('accessToken');
    await controller.refreshToken(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith({ ok: true, accessToken: 'accessToken' });
  });

  it('should not refresh an access token', async () => {
    const mockRequest = ({ cookies: { mullToken: 'mockRefreshAccess' } } as unknown) as Request;
    const mockResponse = ({ send: jest.fn() } as unknown) as Response;
    jwtService.verify.mockImplementation(() => {
      throw new Error();
    });
    await controller.refreshToken(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith({ ok: false, accessToken: '' });
  });

  it('should invalidate a request without the refresh cookie', async () => {
    const mockRequest = ({ cookies: { mullToken: null } } as unknown) as Request;
    const mockResponse = ({ send: jest.fn() } as unknown) as Response;
    await controller.refreshToken(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith({ ok: false, accessToken: '' });
  });

  it('should not refresh a token with an invalid user id', async () => {
    const mockRequest = ({ cookies: { mullToken: 'mockRefreshAccess' } } as unknown) as Request;
    const mockResponse = ({ send: jest.fn() } as unknown) as Response;
    jwtService.verify.mockReturnValue({
      id: mockAllUsers[0].id,
      tokenVersion: mockAllUsers[0].tokenVersion,
    });
    userService.getUser.mockReturnValue(null);
    authService.createAccessToken.mockReturnValue('accessToken');
    await controller.refreshToken(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith({ ok: false, accessToken: '' });
  });

  it('should not refresh a token with a different version', async () => {
    const mockRequest = ({ cookies: { mullToken: 'mockRefreshAccess' } } as unknown) as Request;
    const mockResponse = ({ send: jest.fn() } as unknown) as Response;
    jwtService.verify.mockReturnValue({
      id: mockAllUsers[0].id,
      tokenVersion: 1,
    });
    userService.getUser.mockReturnValue({ ...mockAllUsers[0] });
    authService.createAccessToken.mockReturnValue('accessToken');
    await controller.refreshToken(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith({ ok: false, accessToken: '' });
  });

  it('should clear cookies', async () => {
    const mockRequest = ({ cookies: { mullToken: 'mockRefreshAccess' } } as unknown) as Request;
    const mockResponse = ({ send: jest.fn() } as unknown) as Response;

    await controller.clearToken(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith({ ok: true });
  });
});
