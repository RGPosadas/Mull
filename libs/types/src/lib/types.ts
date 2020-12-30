// Types go here
import { Response, Request } from 'express';
export interface Message {
  message: string;
  info: { production: boolean };
}

export interface IMedia {
  id: number;
  mediaType: string;
}

/**
 * Restriction options for events
 */
export enum EventRestriction {
  NONE,
  FRIENDS_ONLY,
  INVITE_ONLY,
}

export enum RegistrationMethod {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
}

export const EventRestrictionMap = ['Everyone', 'Friends', 'Invite Only'];

export interface IEvent {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  image?: IMedia;
  restriction: EventRestriction;
  participants?: IUser[];
  host?: IUser;
  location?: ILocation;
}

export interface ISerializedEvent extends Omit<IEvent, 'startDate' | 'endDate'> {
  startDate: string;
  endDate: string;
}

export interface ILocation {
  id: number;
  point: string;
  events?: IEvent[];
}

export interface IUser {
  name: string;
}

export interface IMedia {
  id: number;
  mediaType: string;
}

export type GqlContext = {
  req: Request;
  res: Response;
};
