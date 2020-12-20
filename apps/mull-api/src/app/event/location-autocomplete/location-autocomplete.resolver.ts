import { Query, Args } from '@nestjs/graphql';
import axiosInstance from '../../../../axiosConfig';

export class LocationAutocompleteResolver {
  @Query(/* istanbul ignore next */ () => [String])
  async getAutocompletedLocations(@Args('userInput') userInput: String) {
    const response = await axiosInstance.request({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${userInput}&key=${process.env.GOOGLE_KEY}`,
    });
    const autocompleteLocations = response.data.predictions.map((field) => field.description);
    return autocompleteLocations;
  }
}
