import React from 'react';
import { render } from '@testing-library/react';

import NavButtons from './nav-buttons';

describe('NavButtons', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavButtons />);
    expect(baseElement).toBeTruthy();
  });
});
