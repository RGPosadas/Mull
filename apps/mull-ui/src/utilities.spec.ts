import { BoundingBox, Coordinates, Size } from '@mull/types';
import { dummyDetectionResults } from './constants';
import { canvasToImageCoords, coordsInBox, drawDetectionIcons } from './utilities';

describe('Utilities', () => {
  describe('drawDetectionIcons', () => {
    const newCanvasMock = () => {
      const ctx = {
        drawImage: jest.fn(),
        clearRect: jest.fn(),
        strokeText: jest.fn(),
        strokeRect: jest.fn(),
      };

      return {
        getContext: jest.fn(() => ctx),
      };
    };

    window.Image = (class {
      constructor() {
        setTimeout(() => {
          this.onload(); // simulate success
        }, 50);
      }

      onload() {
        // noop
      }
    } as unknown) as typeof Image;

    it('should draw a svg icon', (done) => {
      const canvas = newCanvasMock();
      drawDetectionIcons((canvas as unknown) as HTMLCanvasElement, dummyDetectionResults);
      setTimeout(() => {
        expect(canvas.getContext.mock.calls.length).toBe(1);
        expect(canvas.getContext().drawImage.mock.calls[0].slice(1)).toEqual([47.5, 42.5, 45, 45]);
        done();
      }, 200);
    });

    it('should draw extra information when debugging', (done) => {
      const canvas = newCanvasMock();
      drawDetectionIcons((canvas as unknown) as HTMLCanvasElement, dummyDetectionResults, true);

      setTimeout(() => {
        expect(canvas.getContext.mock.calls.length).toBe(1);
        expect(canvas.getContext().strokeRect.mock.calls[0]).toEqual([20, 40, 100, 50]);
        expect(canvas.getContext().strokeText.mock.calls[0]).toEqual(['recyclable: 80.0%', 20, 35]);
        done();
      }, 200);
    });
  });

  describe('canvasToImageCoords', () => {
    it('should convert canvas coordinates to image space correctly', () => {
      const canvasCoords: Coordinates = {
        x: 250,
        y: 250,
      };

      const canvas: Size = {
        width: 500,
        height: 500,
      };

      // Image is wider than canvas
      let image: Size = {
        width: 300,
        height: 200,
      };
      expect(canvasToImageCoords(canvasCoords, canvas, image)).toStrictEqual({ x: 150, y: 100 });

      // Image is thinner than canvas
      image = {
        width: 200,
        height: 400,
      };
      expect(canvasToImageCoords(canvasCoords, canvas, image)).toStrictEqual({ x: 100, y: 200 });
    });
  });
  describe('coordsInBox', () => {
    it('should convert canvas coordinates to image space correctly', () => {
      const box: BoundingBox = {
        x: 50,
        y: 50,
        width: 200,
        height: 200,
      };
      let coords: Coordinates = {
        x: 150,
        y: 150,
      };
      expect(coordsInBox(coords, box)).toStrictEqual(true);

      coords = {
        x: 20,
        y: 40,
      };
      expect(coordsInBox(coords, box)).toStrictEqual(false);
    });
  });
});
