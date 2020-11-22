// Types go here

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

export enum UserType {
  LOCAL,
  GOOGLE,
  FACEBOOK,
  TWITTER,
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
