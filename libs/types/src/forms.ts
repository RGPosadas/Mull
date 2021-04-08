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
  startTime: number;
  endTime: number;
  eventTitle: string;
  description: string;
  location: ILocation;
  imageFile: string;
}
export interface IProfileEditForm {
  displayName: string;
  description: string;
  imageFile: string;
}

export interface IChatForm {
  message: string;
  imageFile: string;
}

export const LIMITS = {
  DESCRIPTION: 2048,
  USERNAME: 64,
  EVENT_TITLE: 64,
  IMAGE_SIZE: 10000000,
  POST_MESSAGE: 512,
  PROFILE_DESCRIPTION: 1024,
  PROFILE_DESCRIPTION_LINES: 6,
};
