import * as tf from '@tensorflow/tfjs';
import { GraphModel, Tensor } from '@tensorflow/tfjs';
import { MULL_MODEL_URL } from '../../constants';
import { TensorflowJsModel } from './tfjs.model';

jest.mock('@tensorflow/tfjs');

const mockedTf = tf as jest.Mocked<typeof tf>;

mockedTf.loadGraphModel.mockImplementation(async (modelUrl: string) => {
  return ({
    executeAsync: async (inputs, outputs) => {
      return ([
        {
          data: () => [0.2, 0.2, 0.5, 0.5, 0.2, 0.2, 0.5, 0.5],
        },
        {
          data: () => [1, 1],
        },
        {
          data: () => [0.5, 0.5],
        },
        {
          data: () => [2],
        },
      ] as unknown) as Tensor[];
    },
    dispose: async () => {
      // noop
    },
  } as unknown) as GraphModel;
});

mockedTf.tidy.mockImplementation((fn: () => void) => {
  fn();
  return {
    shape: [0, 100, 200],
  };
});

describe('TensorflowJsModel', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  });

  const model = TensorflowJsModel.getInstance();
  TensorflowJsModel.getInstance();

  it('should init on valid model url', async () => {
    model.dispose();
    expect(model.init(MULL_MODEL_URL)).resolves.toEqual(undefined);
  });

  const dummyDetectionResult = {
    bndBox: { height: 30, width: 60, x: 40, y: 20 },
    class: 'bottle',
    confidence: 0.5,
  };

  it('should process model output', async () => {
    let result = await model.detect(null);
    expect(result).toEqual([dummyDetectionResult, dummyDetectionResult]);

    result = await model.detect(null, { numResults: 1, threshold: 0.6 });
    expect(result).toEqual([]);

    model.dispose();
  });
});
