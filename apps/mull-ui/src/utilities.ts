/**
 * Converts date to a list of tokens for displaying
 *
 * @param date the date as a string to convert
 */
export const formatDate = (
  dateString: string | Date
): { year: number; month: string; day: number; time: string } => {
  const date = new Date(dateString);
  const month = Intl.DateTimeFormat('en-us', {
    month: 'short',
  }).format(date);
  const timeString = Intl.DateTimeFormat('en-us', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return { year: date.getFullYear(), month, day: date.getDate(), time: timeString };
};
