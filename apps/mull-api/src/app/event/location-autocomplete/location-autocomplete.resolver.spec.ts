import { LocationAutocompleteResolver } from './location-autocomplete.resolver';
import { Test, TestingModule } from '@nestjs/testing';
import axiosInstance from '../../../../axiosConfig';

const userInput = '845 rue Sherbrooke';

jest.mock('../../../../axiosConfig', () => {
  return {
    baseURL: `https://app.geocodeapi.io/api/v1/autocomplete?apikey=${process.env.GEOCODE_KEY}&text=test_location&size=5`,
    request: jest.fn().mockResolvedValue({
      data: { features: [{ properties: { label: 'mockedLocation' } }] },
    }),
  };
});

describe('autocomplete resolver', () => {
  let resolver: LocationAutocompleteResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationAutocompleteResolver],
    }).compile();

    resolver = module.get<LocationAutocompleteResolver>(LocationAutocompleteResolver);
  });

  afterEach(() => jest.resetAllMocks());

  it('should return array of autocomplete locations', async () => {
    const res = await resolver.getAutocompletedLocations(userInput);
    expect(axiosInstance.request).toHaveBeenCalled();
    expect(axiosInstance.request).toHaveBeenCalledWith({
      method: 'get',
      url: `https://app.geocodeapi.io/api/v1/autocomplete?apikey=${process.env.GEOCODE_KEY}&text=${userInput}&size=5`,
    });

    expect(res).toEqual(['mockedLocation']);
  });
});
