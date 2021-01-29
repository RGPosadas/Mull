import { Test, TestingModule } from '@nestjs/testing';
import { LocationInput } from './inputs/location.input';
import { mockAllLocations, mockLocationInput } from './location.mockdata';
import { LocationResolver } from './location.resolver';
import { LocationService } from './location.service';

const mockLocationService = () => ({
  createLocation: jest.fn((mockLocationData: LocationInput) => ({ ...mockLocationData })),
  getLocation: jest.fn((id: number) => mockAllLocations.find((location) => location.id === id)),
});

describe('LocationResolver', () => {
  let resolver: LocationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationResolver, { provide: LocationService, useFactory: mockLocationService }],
    }).compile();

    resolver = module.get<LocationResolver>(LocationResolver);
  });

  it('should return a location', async () => {
    const returnedLocation = await resolver.createLocation({ ...mockLocationInput });
    expect(returnedLocation).toEqual(mockLocationInput);
  });

  it('should return a location with coordinates', async () => {
    const returnedLocation = await resolver.location(2);
    expect(returnedLocation).toEqual(mockAllLocations[1]);
  });

  it('should return a location with placeId', async () => {
    const returnedLocation = await resolver.location(1);
    expect(returnedLocation).toEqual(mockAllLocations[0]);
  });
});
