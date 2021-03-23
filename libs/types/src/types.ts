// Types go here
import { Request, Response } from 'express';
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

export enum RelationshipType {
  FRIENDS,
  ADDED_ME,
  PENDING_REQUEST,
  NONE,
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
  coHosts?: IUser[];
  location?: ILocation;
}

export interface ISerializedEvent extends Omit<IEvent, 'startDate' | 'endDate'> {
  startDate: string;
  endDate: string;
}

export interface ILocation {
  id?: number;
  title: string;
  event?: IEvent;
  coordinates?: IPoint;
  placeId?: string;
}

export interface IPoint {
  lat: number;
  long: number;
}

export interface IUser {
  id: number;
  name?: string;
}

export interface IMedia {
  id: number;
  mediaType: string;
}

export interface IAuthToken {
  id: number;
  iat: number;
  exp: number;
}

export type GqlContext = {
  req: Request;
  res: Response;
};

export interface IRefreshResponse {
  ok: boolean;
  accessToken: string;
}

export interface IRoute {
  url: string;
  displayName: string;
}

export class IGooglePlace {
  description: string;
  placeId: string;
}

export interface IWebSocketParams {
  authToken: string;
}

export interface IPost {
  id: number;
  user: IUser;
  parentPost: IPost;
  message: string;
  createdTime: Date;
  medias?: IMedia;
  channel: IChannel;
}

export interface ISerializedPost extends Omit<IPost, 'createdTime'> {
  createdTime: string;
}

export interface IChannel {
  id: number;
  name: string;
  rights: number;
  event?: ISerializedEvent;
  participants: IUser[];
  posts: ISerializedPost[];
}
