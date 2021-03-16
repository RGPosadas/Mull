export enum WasteType {
  TRASH,
  RECYCLABLE,
  COMPOST,
  EWASTE,
}

/**
 * This map constant must be updated according to the content of
 * ml/trash-recognition/annotations/label_map.pbtxt
 */
export const labelMap = {
  1: 'bottle',
  2: 'box',
  3: 'computer keyboard',
  4: 'food',
  5: 'mobile phone',
  6: 'plastic bag',
  7: 'tin can',
};

/**
 * The keys in this map need to match the values in the labelMap above
 */
export const categoryMap = {
  bottle: WasteType.RECYCLABLE,
  box: WasteType.RECYCLABLE,
  'computer keyboard': WasteType.EWASTE,
  food: WasteType.COMPOST,
  'mobile phone': WasteType.EWASTE,
  'plastic bag': WasteType.TRASH,
  'tin can': WasteType.RECYCLABLE,
};
