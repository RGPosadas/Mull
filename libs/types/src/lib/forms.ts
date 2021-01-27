import { EventRestriction, ILocation } from './types';

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface ICreateEventForm {
  activeRestriction: EventRestriction;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  eventTitle: string;
  description: string;
  location: ILocation;
  imageFile: string;
}
