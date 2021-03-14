export interface Coordinates {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface BoundingBox extends Coordinates, Size {}

export enum WasteCategory {
  TRASH,
  RECYCLABLE,
  COMPOST,
  EWASTE,
}

/**
 * This array constant must be updated according to the content of
 * ml/trash-recognition/annotations/label_map.pbtxt
 */
export const wasteClasses = [
  'bottle',
  'box',
  'computer keyboard',
  'food',
  'mobile phone',
  'plastic bag',
  'tin can',
] as const;

export type WasteClassesType = typeof wasteClasses[number];

export type WasteClassMapType = {
  [key in WasteClassesType]: { category: WasteCategory; info: string };
};

export interface DetectionResult {
  class: WasteClassesType;
  bndBox: BoundingBox;
  confidence: number;
}

export const wasteClassMap: WasteClassMapType = {
  bottle: {
    category: WasteCategory.RECYCLABLE,
    info:
      "Bottles made in either plastic or glass are fully recyclable. Just make sure they're clean!",
  },
  box: {
    category: WasteCategory.RECYCLABLE,
    info: "Boxes are typically made of cardboard, and are recyclable if they're clean.",
  },
  'computer keyboard': {
    category: WasteCategory.EWASTE,
    info: 'Electronic devices like keyboards should be disposed of at specialized e-centers.',
  },
  food: { category: WasteCategory.COMPOST, info: 'Food goes in the compost!' },
  'mobile phone': {
    category: WasteCategory.EWASTE,
    info: 'Electronic devices like phones should be disposed of at specialized e-centers.',
  },
  'plastic bag': {
    category: WasteCategory.TRASH,
    info:
      "Plastic bags unfortunately can't be recycled or composted, although they can be reused! If you can't reuse the bag, then it should go in the trash.",
  },
  'tin can': { category: WasteCategory.RECYCLABLE, info: 'Metal cans go in the recycling bin!' },
};
