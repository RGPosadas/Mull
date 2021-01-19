import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';
import { LocationAutocompleteModule } from './location-autocomplete/location-autocomplete.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), LocationAutocompleteModule],
  providers: [EventService, EventResolver],
})
export class EventModule {}
