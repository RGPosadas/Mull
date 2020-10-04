import React from 'react';
import { render } from '@testing-library/react';

import NavigationBar from './navigation-bar';

describe('NavigationBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavigationBar />);
    expect(baseElement).toBeTruthy();
  });
});
