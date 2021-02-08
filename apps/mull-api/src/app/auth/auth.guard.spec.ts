import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
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

    it('should return true with auth', () => {
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

    it('should return false with invalid auth', () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getNext.mockReturnValue({
        req: {
          headers: {
            authorization: '',
          },
        },
      });

      mockedJwt.verify.mockImplementation(() => false);
      expect(guard.canActivate(context)).toBe(false);
    });

    it('should throw exception with invalid header', () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getNext.mockReturnValue({
        req: {
          headers: {},
        },
      });

      mockedJwt.verify.mockImplementation(() => false);
      expect(() => guard.canActivate(context)).toThrow('Unauthorized');
    });
  });
  // This testing methodology for param decorators was found on the nestjs github repo
  // https://github.com/nestjs/nest/issues/1020
  /* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
  describe('Auth Param Decorator', () => {
    function getParamDecoratorFactory(decorator: Function) {
      class Test {
        public test(@decorator() value) {}
      }

      const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
      return args[Object.keys(args)[0]].factory;
    }

    it('should return userId with auth', () => {
      const context = createMock<ExecutionContext>();
      context.switchToHttp().getNext.mockReturnValue({
        req: {
          headers: {
            authorization: 'auth',
          },
        },
      });

      const mockUserId = 1;
      mockedJwt.verify.mockImplementation(() => {
        return { id: mockUserId };
      });

      const factory = getParamDecoratorFactory(AuthenticatedUser);
      const result = factory(null, context);
      expect(result).toBe(mockUserId);
    });

    it('should throw exception with invalid accesstoken', () => {
      const context = createMock<ExecutionContext>();
      context.switchToHttp().getNext.mockReturnValue({
        req: {
          headers: {
            authorization: '',
          },
        },
      });
      mockedJwt.verify.mockImplementation(() => {
        throw new Error();
      });
      const factory = getParamDecoratorFactory(AuthenticatedUser);
      expect(() => factory(null, context)).toThrow('Unauthorized');
    });

    it('should throw exception with invalid header', () => {
      const context = createMock<ExecutionContext>();
      context.switchToHttp().getNext.mockReturnValue({
        req: {
          headers: {},
        },
      });
      const factory = getParamDecoratorFactory(AuthenticatedUser);
      expect(() => factory(null, context)).toThrow('Unauthorized');
    });
  });
});
