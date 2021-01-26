import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../entities';
import { LocationResolver } from './location.resolver';
import { LocationService } from './location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationService, LocationResolver],
})
export class LocationModule {}
