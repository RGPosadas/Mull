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
