// Types go here

export interface Message {
  message: string;
  info: { production: boolean };
}

/**
 * Restriction options for events
 */
export enum EventRestriction {
  NONE,
  FRIENDS_ONLY,
  INVITE_ONLY,
}

export interface IEvent {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  image?: IMedia;
}

export interface IMedia {
  id: number;
  mediaType: string;
}
