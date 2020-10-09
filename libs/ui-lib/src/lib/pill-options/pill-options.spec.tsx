import React from 'react';
import { render } from '@testing-library/react';

import PillOptions from './pill-options';

describe('RestrictionOptions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PillOptions options={['test']} />);
    expect(baseElement).toBeTruthy();
  });
});
