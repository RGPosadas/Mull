import React from 'react';
import { render } from '@testing-library/react';

import MullModal from './mull-modal';

describe('MullModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MullModal />);
    expect(baseElement).toBeTruthy();
  });
});
