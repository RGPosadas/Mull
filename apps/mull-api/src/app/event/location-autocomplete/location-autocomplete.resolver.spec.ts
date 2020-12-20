import { LocationAutocompleteResolver } from './location-autocomplete.resolver';
import { Test, TestingModule } from '@nestjs/testing';
import axiosInstance from '../../../../axiosConfig';

const userInput = 'mockInput';

jest.mock('../../../../axiosConfig', () => {
  return {
    baseURL: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=mockInput&key=${process.env.GOOGLE_KEY}`,
    request: jest.fn().mockResolvedValue({
      data: { predictions: [{ description: 'mockedLocation' }] },
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
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${userInput}&key=${process.env.GOOGLE_KEY}`,
    });

    expect(res).toEqual(['mockedLocation']);
  });
});
