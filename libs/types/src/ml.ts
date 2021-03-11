export interface Coordinates {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface BoundingBox extends Coordinates, Size {}

export interface DetectionResult {
  class: string;
  bndBox: BoundingBox;
  confidence: number;
}
