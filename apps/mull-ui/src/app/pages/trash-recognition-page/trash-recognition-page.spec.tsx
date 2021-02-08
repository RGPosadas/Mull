import { render } from '@testing-library/react';
import React from 'react';
import TrashRecognitionPage from './trash-recognition-page';
jest.mock('@tensorflow/tfjs');

describe('TrashRecognitionPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrashRecognitionPage />);
    expect(baseElement).toBeTruthy();
  });
});
