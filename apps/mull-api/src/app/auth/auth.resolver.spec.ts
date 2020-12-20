import { GqlContext } from '@mull/types';
import { Test, TestingModule } from '@nestjs/testing';
import { Response, Request } from 'express';
import { AuthResolver, LoginResult } from './auth.resolver';
import { AuthService } from './auth.service';
import { LoginInput } from './inputs/auth.input';

const mockAuthService = () => ({
  validateUser: jest.fn(),
  createRefreshToken: jest.fn(),
  sendRefreshToken: jest.fn(),
  createAccessToken: jest.fn(() => 'accessToken'),
});

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useFactory: mockAuthService,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should login a valid user', async () => {
    const mockRequest = ({} as unknown) as Request;
    const mockResponse = ({} as unknown) as Response;
    const mockGqlContext: GqlContext = { req: mockRequest, res: mockResponse };
    const result: LoginResult = await resolver.login(
      { email: 'asd@ad.ca', password: 'abc123' } as LoginInput,
      mockGqlContext
    );
    expect(result.accessToken).toBe('accessToken');
  });
});
