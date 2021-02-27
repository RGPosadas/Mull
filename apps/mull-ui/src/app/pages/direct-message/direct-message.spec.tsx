import { render } from '@testing-library/react';
import React from 'react';
import DirectMessagePage from './direct-message';

describe('DirectMessage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DirectMessagePage />);
    expect(baseElement).toBeTruthy();
  });
});
