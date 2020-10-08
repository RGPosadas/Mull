import React from 'react';
import { render } from '@testing-library/react';

import RestrictionOptions from './restriction-options';

describe('RestrictionOptions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RestrictionOptions />);
    expect(baseElement).toBeTruthy();
  });
});
