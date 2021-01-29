import { Location } from '../entities';
import { LocationInput } from './inputs/location.input';

export const mockLocationInput: LocationInput = {
  title: 'locationPlaceId',
  placeId: 'thiIsAPlaceId',
};

export const mockAllLocations: Location[] = [
  { id: 1, title: 'locationPlaceId', event: null, placeId: 'thiIsAPlaceId', coordinates: null },
  {
    id: 2,
    title: 'locationCoordinates',
    event: null,
    placeId: null,
    coordinates: {
      id: 1,
      lat: -54.5644,
      long: 551.545,
    },
  },
];
