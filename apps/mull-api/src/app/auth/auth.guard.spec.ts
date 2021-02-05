import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { AuthenticatedUser, AuthGuard } from './auth.guard';
jest.mock('jsonwebtoken');
const mockedJwt = jwt as jest.Mocked<typeof jwt>;

describe('AuthGuards', () => {
  describe('AuthGuard', () => {
    let guard;
    beforeEach(() => {
      guard = new AuthGuard();
    });

    it('AuthGuard', () => {
      expect(guard).toBeDefined();
    });

    it('Guard should return true with auth', () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getNext.mockReturnValue({
        req: {
          headers: {
            authorization: 'auth',
          },
        },
      });

      mockedJwt.verify.mockImplementation(() => true);
      expect(guard.canActivate(context)).toBeTruthy();
    });

    it('Guard should return false without auth', () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getNext.mockReturnValue({
        req: {
          headers: {
            authorization: 'auth',
          },
        },
      });

      mockedJwt.verify.mockImplementation(() => false);
      expect(guard.canActivate(context)).toBeFalsy();
    });
  });

  describe('Auth Param Decorator', () => {
    it('Auth param decorator should return with auth', () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getNext.mockReturnValue({
        req: {
          headers: {
            authorization: 'auth',
          },
        },
      });

      mockedJwt.verify.mockImplementation(() => true);
      expect(AuthenticatedUser.call(context)).toBeTruthy();
    });

    it('should return false with auth for param decorator', () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getNext.mockReturnValue({
        req: {
          headers: {
            authorization: 'auth',
          },
        },
      });

      mockedJwt.verify.mockImplementation(() => false);
      expect(AuthenticatedUser.call(context)).toThrow();
    });
  });
});
