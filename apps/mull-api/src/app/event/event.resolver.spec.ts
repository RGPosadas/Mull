import { Test, TestingModule } from '@nestjs/testing';
import { EventResolver } from './event.resolver';

describe('EventResolver', () => {
  let resolver: EventResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventResolver],
    }).compile();

    resolver = module.get<EventResolver>(EventResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
