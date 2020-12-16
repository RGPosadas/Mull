import { Query, Args } from '@nestjs/graphql';
import axiosInstance from '../../../../axiosConfig';

export class LocationAutocompleteResolver {
  @Query(/* istanbul ignore next */ () => [String])
  async getAutocompletedLocations(@Args('userInput') userInput: String) {
    const response = await axiosInstance.request({
      method: 'get',
      url: `https://app.geocodeapi.io/api/v1/autocomplete?apikey=${process.env.GEOCODE_KEY}&text=${userInput}&size=5`,
    });
    const { data } = response;
    return response.data.features.map(({ properties: { label } }) => label);
  }
}
