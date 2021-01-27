import { Args, Field, ObjectType, Query } from '@nestjs/graphql';

@ObjectType()
export class GooglePlace {
  @Field()
  description: string;

  @Field()
  placeId: string;
}

export class LocationAutocompleteResolver {
  @Query(/* istanbul ignore next */ () => [GooglePlace])
  async getAutocompletedLocations(@Args('userInput') userInput: string) {
    // const response = await axiosInstance.request({
    //   method: 'get',
    //   url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${userInput}&key=${environment.googleApi.placesApi}`,
    // });
    // if (response.data.error_message) {
    //   throw new Error(response.data.error_message);
    // }

    // console.log(response.data.predictions[0]);
    // const autocompleteLocations: GooglePlace[] = response.data.predictions.map((field) => {
    //   const googlePlace: GooglePlace = { description: field.description, placeId: field.place_id };
    //   return googlePlace;
    // });
    // console.log(autocompleteLocations);
    // return autocompleteLocations;
    return [];
  }
}
