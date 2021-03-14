import { BoundingBox, Coordinates, DetectionResult, ISerializedEvent, Size } from '@mull/types';
import emojiRegexRGI from 'emoji-regex/es2015/RGI_Emoji.js';
import { classMap } from './app/services/maps';
import { WasteTypeSvgMap } from './constants';
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
    const category = classMap[result.class].category;
    const dx = box.x - svgSize / 2 + box.width / 2;
    const dy = box.y - svgSize / 2 + box.height / 2;

    if (debug) {
      ctx.strokeStyle = '#00ff00';
      ctx.font = '20px Courier';
      ctx.strokeRect(box.x, box.y, box.width, box.height);
      ctx.strokeText(`${result.class}: ${(result.confidence * 100).toFixed(1)}%`, box.x, box.y - 5);
    }
    var icon = new Image();
    icon.onload = () => {
      ctx.drawImage(icon, dx, dy, svgSize, svgSize);
    };
    icon.src = WasteTypeSvgMap[category];
  });
};

export const hasEmoji = (text: string) => {
  return !!emojiRegexRGI().exec(text);
};

/**
 * Transforms the given canvasCoordinates to image space.
 *
 * @param canvasCoords The coordinates to transform
 * @param canvas The canvas size
 * @param image The image size
 * @returns image coordinates
 */
export const canvasToImageCoords = (
  canvasCoords: Coordinates,
  canvas: Size,
  image: Size
): Coordinates => {
  const imageCoords: Coordinates = {
    x: 0,
    y: 0,
  };
  const canvasRatio = canvas.width / canvas.height;
  const imageRatio = image.width / image.height;

  if (canvasRatio > imageRatio) {
    // Canvas wider than image. There is padding on the sides of the image
    imageCoords.y = (canvasCoords.y / canvas.height) * image.height;

    // Since the sides of the canvas have white padding, we need to find the offset to counterbalance this
    const trueWidth = (canvas.height / image.height) * image.width;
    const xOffset = (canvas.width - trueWidth) / 2;
    imageCoords.x = ((canvasCoords.x - xOffset) / trueWidth) * image.width;
  } else {
    // Canvas wider than image. There is padding on the top/bottom of the image
    imageCoords.x = (canvasCoords.x / canvas.width) * image.width;

    // Since the top/bottom of the canvas have white padding, we need to find the offset to counterbalance this
    const trueHeight = (canvas.width / image.width) * image.height;
    const offsetY = (canvas.height - trueHeight) / 2;
    imageCoords.y = ((canvasCoords.y - offsetY) / trueHeight) * image.height;
  }

  return imageCoords;
};

export const coordsInBox = (coords: Coordinates, box: BoundingBox): boolean => {
  return (
    coords.x > box.x &&
    coords.x < box.x + box.width &&
    coords.y > box.y &&
    coords.y < box.y + box.height
  );
};

export const sortEventsByDate = (events: Partial<ISerializedEvent>[]) => {
  return events
    .slice()
    .sort(
      (event1, event2) =>
        new Date(event1.startDate).valueOf() - new Date(event2.startDate).valueOf()
    );
};
