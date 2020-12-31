/**
 * Converts date to a list of tokens for displaying
 *
 * @param date the date to convert
 */
export const formatDate = (
  date: Date | string
): { year: number; month: string; day: number; time: string } => {
  const realDate = new Date(date);
  const month = Intl.DateTimeFormat('en-us', {
    month: 'short',
  }).format(realDate);
  const timeString = Intl.DateTimeFormat('en-us', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(realDate);

  return { year: realDate.getFullYear(), month, day: realDate.getDate(), time: timeString };
};
