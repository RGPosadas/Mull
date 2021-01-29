import { ISerializedEvent } from '@mull/types';
import { environment } from './environments/environment';

/**
 * Converts date to a list of tokens for displaying
 *
 * @param date the date to convert
 */
export const formatDate = (
  date: Date
): { year: number; month: string; day: number; time: string } => {
  const month = Intl.DateTimeFormat('en-us', {
    month: 'short',
  }).format(date);
  const timeString = Intl.DateTimeFormat('en-us', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return { year: date.getFullYear(), month, day: date.getDate(), time: timeString };
};

export const mediaUrl = (event: Partial<ISerializedEvent>) =>
  `${environment.backendUrl}/api/media/${event.image.id}`;
