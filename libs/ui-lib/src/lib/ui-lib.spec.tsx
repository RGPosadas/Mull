import React from 'react';
import { render } from '@testing-library/react';

import UiLib from './ui-lib';

describe('UiLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiLib />);
    expect(baseElement).toBeTruthy();
  });
});
