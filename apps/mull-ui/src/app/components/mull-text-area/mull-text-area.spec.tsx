import React from 'react';
import { render } from '@testing-library/react';

import MullTextArea from './mull-text-area';

describe('MullTextArea', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MullTextArea />);
    expect(baseElement).toBeTruthy();
  });
});
