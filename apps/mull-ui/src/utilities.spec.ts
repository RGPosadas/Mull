import { dummyDetectionResults } from './constants';
import { drawDetectionIcons } from './utilities';

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
        expect(canvas.getContext().strokeRect.mock.calls[0]).toEqual([20, 20, 100, 50]);
        expect(canvas.getContext().strokeText.mock.calls[0]).toEqual(['recyclable: 80.0%', 20, 40]);
        done();
      }, 200);
    });
  });
});
