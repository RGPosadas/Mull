import React from 'react';
import { render } from '@testing-library/react';

import TimeSlider from './time-slider';

describe('TimeSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TimeSlider />);
    expect(baseElement).toBeTruthy();
  });
});
