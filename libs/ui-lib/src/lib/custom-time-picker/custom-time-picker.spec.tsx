import React from 'react';
import { render } from '@testing-library/react';

import CustomTimePicker from './custom-time-picker';

describe('CustomTimePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomTimePicker />);
    expect(baseElement).toBeTruthy();
  });
});
