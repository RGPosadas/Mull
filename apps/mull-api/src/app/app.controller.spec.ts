import { IGooglePlace } from '@mull/types';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to mull-api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to mull-api!',
        info: { production: false },
      });
    });
  });
  describe('autocomplete resolver', () => {
    const mockedGoogleApiData = [
      {
        description: 'mock',
        place_id: 'mock',
      },
    ];

    const expectedData: IGooglePlace[] = [
      {
        description: 'mock',
        placeId: 'mock',
      },
    ];

    const userInput = 'mockInput';

    it('should return array of autocomplete locations', async () => {
      const appController = app.get<AppController>(AppController);

      const response = {
        data: {
          error_message: null,
          predictions: mockedGoogleApiData,
        },
      };
      mockedAxios.get.mockResolvedValue(response);

      const res = await appController.getLocationAutocomplete(userInput);

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${userInput}&key=${environment.googleApi.placesApi}`
      );

      expect(res).toEqual(expectedData);
    });

    it('should return error on error from google api', async () => {
      const appController = app.get<AppController>(AppController);

      const response = {
        data: {
          error_message: 'error',
          predictions: mockedGoogleApiData,
        },
      };
      mockedAxios.get.mockResolvedValue(response);

      expect(appController.getLocationAutocomplete(userInput)).rejects.toEqual(new Error('error'));
    });
  });
});
