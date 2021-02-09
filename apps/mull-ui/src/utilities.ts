import { DetectionResult, ISerializedEvent } from '@mull/types';
import { categoryMap, WasteType } from './app/services/maps';
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

const svgSize = 45;
const svgMap = {
  [WasteType.COMPOST]: './assets/icons/trash-recognition-icons/CompostIcon.svg',
  [WasteType.EWASTE]: './assets/icons/trash-recognition-icons/GeneralIcon.svg',
  [WasteType.TRASH]: './assets/icons/trash-recognition-icons/TrashIcon.svg',
  [WasteType.RECYCLABLE]: './assets/icons/trash-recognition-icons/RecycleIcon.svg',
};

export const drawDetectionIcons = async (
  ctx: CanvasRenderingContext2D,
  results: DetectionResult[]
) => {
  results.forEach((result) => {
    const box = result.bndBox;
    const category = categoryMap[result.class];
    const dx = box.x - svgSize / 2 + box.width / 2;
    const dy = box.y - svgSize / 2 + box.height / 2;

    var icon = new Image();
    icon.onload = () => {
      ctx.drawImage(icon, dx, dy, svgSize, svgSize);
    };
    icon.src = svgMap[category];
  });
};
