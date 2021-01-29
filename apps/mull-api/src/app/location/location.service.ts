import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities';
import { LocationInput } from './inputs/location.input';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>
  ) {}

  getLocation(id: number): Promise<Location> {
    return this.locationRepository.findOne(id, { relations: ['coordinates'] });
  }

  createLocation(location: LocationInput): Promise<Location> {
    return this.locationRepository.save(location);
  }
}
