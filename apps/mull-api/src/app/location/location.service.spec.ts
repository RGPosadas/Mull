import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';
import { LocationInput } from './inputs/location.input';
import { mockAllLocations, mockLocationInput } from './location.mockdata';
import { LocationService } from './location.service';

const mockLocationRepository = () => ({
  create: jest.fn((mockLocationData: LocationInput) => ({ ...mockLocationData })),
  findOne: jest.fn((id: number, options?: FindOneOptions<Location>) => {
    const foundLocation = mockAllLocations.find((location) => location.id === id);
    if (options && 'coordinates' in options.relations) {
      return foundLocation.coordinates;
    }
    return foundLocation;
  }),
  save: jest.fn((location: Location) => location),
});

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        { provide: getRepositoryToken(Location), useFactory: mockLocationRepository },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should create a location', () => {
    const mockCreatedLocation = service.createLocation(mockLocationInput);
    expect(mockCreatedLocation).toEqual(mockLocationInput);
  });

  it('should find a location with coordinates', () => {
    const foundLocation = service.getLocation(2);
    expect(foundLocation).toEqual(mockAllLocations[1]);
  });

  it('should find a location with Google PlaceId', () => {
    const foundLocation = service.getLocation(1);
    expect(foundLocation).toEqual(mockAllLocations[0]);
  });
});
