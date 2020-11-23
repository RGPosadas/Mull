import { Module } from '@nestjs/common';
import { LocationAutocompleteResolver } from './location-autocomplete.resolver';

@Module({
  providers: [LocationAutocompleteResolver],
})
export class LocationAutocompleteModule {}
