import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Location } from '../entities';
import { LocationInput } from './inputs/location.input';
import { LocationService } from './location.service';

@Resolver('Location')
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Query(/* istanbul ignore next */ () => Location)
  async location(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.locationService.getLocation(id);
  }

  @Mutation(() => Location)
  async createLocation(@Args('location') location: LocationInput) {
    return this.locationService.createLocation(location);
  }
}
