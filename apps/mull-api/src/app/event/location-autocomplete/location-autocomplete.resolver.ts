import { Query, Args } from '@nestjs/graphql';
import axios from 'axios';

export class LocationAutocompleteResolver {
  @Query(/* istanbul ignore next */ () => [String])
  async getAutocompletedLocations(@Args('userInput') userInput: String) {
    const response = await axios.get(
      `https://app.geocodeapi.io/api/v1/autocomplete?apikey=${process.env.GEOCODE_KEY}&text=${userInput}&size=5`
    );
    return response.data.features.map(({ properties: { label } }) => label);
  }
}
