import React from 'react';
import { render } from '@testing-library/react';

import EventPageInfo from './event-page-info';

describe('EventPageInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventPageInfo />);
    expect(baseElement).toBeTruthy();
  });
});
