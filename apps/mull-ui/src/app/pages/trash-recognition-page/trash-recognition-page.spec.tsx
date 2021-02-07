import React from 'react';
import { render } from '@testing-library/react';

import TrashRecognitionPage from './trash-recognition-page';

describe('TrashRecognitionPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrashRecognitionPage />);
    expect(baseElement).toBeTruthy();
  });
});
