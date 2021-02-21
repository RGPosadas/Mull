import { IGooglePlace } from '@mull/types';
import { Controller, Get, Query } from '@nestjs/common';
import axios from 'axios';
import { environment } from '../environments/environment';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('location-autocomplete')
  async getLocationAutocomplete(@Query('search') search: string): Promise<IGooglePlace[]> {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${environment.googleApi.placesApi}`
    );
    if (response.data.error_message) {
      throw new Error(response.data.error_message);
    }

    return response.data.predictions.map((field) => {
      return { description: field.description, placeId: field.place_id } as IGooglePlace;
    }) as IGooglePlace[];
  }
}
