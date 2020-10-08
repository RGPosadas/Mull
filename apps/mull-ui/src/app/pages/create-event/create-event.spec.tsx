import React from 'react';
import { render } from '@testing-library/react';

import CreateEvent from './create-event';

describe('CreateEvent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateEvent />);
    expect(baseElement).toBeTruthy();
  });
});
