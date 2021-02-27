import { render } from '@testing-library/react';
import React from 'react';
import { TensorflowJsModel } from '../../services/tfjs.model';
import TrashRecognitionPage from './waste-recognition-page';

jest.mock('@tensorflow/tfjs');

HTMLMediaElement.prototype.pause = jest.fn();
HTMLMediaElement.prototype.play = jest.fn();

const mediaDevicesMock: MediaDevices = {
  getUserMedia: async (constraints) => {
    return {
      getTracks: () => [
        {
          getSettings: jest.fn(() => {
            return { width: 300, height: 300 };
          }),
          stop: jest.fn(),
        },
      ],
    };
  },
};

const TensorflowJsModelMock = () => {
  return {
    detect: jest.fn(),
    dispose: jest.fn(),
    init: jest.fn(async () => {
      // noop
    }),
    model: {
      dispose: jest.fn(),
    },
    detecting: false,
    toDispose: false,
  };
};

navigator.mediaDevices = mediaDevicesMock;

TensorflowJsModel.getInstance = TensorflowJsModelMock;

describe('TrashRecognitionPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrashRecognitionPage />);
    expect(baseElement).toBeTruthy();
  });
});
