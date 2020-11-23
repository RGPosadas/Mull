import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationAutocompleteModule } from './location-autocomplete/location-autocomplete.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), LocationAutocompleteModule],
  providers: [EventService, EventResolver],
})
export class EventModule {}
