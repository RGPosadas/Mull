import { dummyDetectionResults } from './constants';
import { drawDetectionIcons } from './utilities';

describe('Utilities', () => {
  describe('drawDetectionIcons', () => {
    const mockCtx = {
      drawImage: jest.fn(
        (image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number) => {
          // noop
        }
      ),
    };
    it('should draw a svg icon', (done) => {
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

      drawDetectionIcons((mockCtx as unknown) as CanvasRenderingContext2D, dummyDetectionResults);

      setTimeout(() => {
        expect(mockCtx.drawImage.mock.calls.length).toBe(1);
        expect(mockCtx.drawImage.mock.calls[0].slice(1)).toEqual([47.5, 42.5, 45, 45]);
        done();
      }, 200);
    });
  });
});
