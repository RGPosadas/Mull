import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { Location } from '../entities';
import { LocationInput } from './inputs/location.input';
import { LocationService } from './location.service';

@Resolver(/* istanbul ignore next */ () => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Query(/* istanbul ignore next */ () => Location)
  @UseGuards(AuthGuard)
  async location(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.locationService.getLocation(id);
  }

  @Mutation(/* istanbul ignore next */ () => Location)
  @UseGuards(AuthGuard)
  async createLocation(@Args('location') location: LocationInput) {
    return this.locationService.createLocation(location);
  }
}
