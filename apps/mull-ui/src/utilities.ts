import { DetectionResult, ISerializedEvent } from '@mull/types';
import emojiRegexRGI from 'emoji-regex/es2015/RGI_Emoji.js';
import { categoryMap, WasteType } from './app/services/maps';
import { environment } from './environments/environment';
import { User } from './generated/graphql';

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

export const formatJoinDate = (date: Date): { year: number; month: string; day: number } => {
  const month = Intl.DateTimeFormat('en-us', {
    month: 'long',
  }).format(date);

  return { year: date.getFullYear(), month, day: date.getDate() };
};

export const formatChatBubbleDate = (date: Date) => {
  return `${date.getHours()}:${String(date.getMinutes()).padStart(
    2,
    '0'
  )} ${date.toLocaleDateString()}`;
};

export const mediaUrl = (event: Partial<ISerializedEvent>) =>
  `${environment.backendUrl}/api/media/${event.image.id}`;

const svgSize = 45;
export const svgMap = {
  [WasteType.COMPOST]: './assets/icons/trash-recognition-icons/CompostIcon.svg',
  [WasteType.EWASTE]: './assets/icons/trash-recognition-icons/GeneralIcon.svg',
  [WasteType.TRASH]: './assets/icons/trash-recognition-icons/TrashIcon.svg',
  [WasteType.RECYCLABLE]: './assets/icons/trash-recognition-icons/RecycleIcon.svg',
};

export const avatarUrl = (user: Partial<User>) =>
  user.avatar
    ? `${environment.backendUrl}/api/media/${user.avatar.id}`
    : `./assets/icons/icon-192x192.png`;

export const drawDetectionIcons = (
  canvas: HTMLCanvasElement,
  results: DetectionResult[],
  debug = false
) => {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  results.forEach((result) => {
    const box = result.bndBox;
    const category = categoryMap[result.class];
    const dx = box.x - svgSize / 2 + box.width / 2;
    const dy = box.y - svgSize / 2 + box.height / 2;

    if (debug) {
      ctx.strokeStyle = '#00ff00';
      ctx.font = '20px Courier';
      ctx.strokeRect(box.x, box.y - 20, box.width, box.height);
      ctx.strokeText(`${result.class}: ${(result.confidence * 100).toFixed(1)}%`, box.x, box.y);
    }
    var icon = new Image();
    icon.onload = () => {
      ctx.drawImage(icon, dx, dy, svgSize, svgSize);
    };
    icon.src = svgMap[category];
  });
};

export const hasEmoji = (text: string) => {
  return !!emojiRegexRGI().exec(text);
};
