import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { mockAllUsers } from '../user/user.mockdata';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockAuthService = () => ({
  authLogin: jest.fn((req: Request) => {
    if (!req.user) return null;
    return { user: req.user };
  }),
});

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useFactory: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a user', () => {
    const mockRequest = ({ user: mockAllUsers[0] } as unknown) as Request;
    const ggResult = controller.googleAuthRedirect(mockRequest);
    const fbResult = controller.facebookAuthRedirect(mockRequest);
    const twResult = controller.twitterAuthRedirect(mockRequest);
    expect(ggResult).toEqual(mockRequest);
    expect(fbResult).toEqual(mockRequest);
    expect(twResult).toEqual(mockRequest);
  });

  it('should return null', () => {
    const mockRequest = ({} as unknown) as Request;
    const ggResult = controller.googleAuthRedirect(mockRequest);
    const fbResult = controller.facebookAuthRedirect(mockRequest);
    const twResult = controller.twitterAuthRedirect(mockRequest);
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
});
