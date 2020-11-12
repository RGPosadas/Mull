import React from 'react';
import { render } from '@testing-library/react';

import EventPageHeader from './event-page-header';

describe('EventPageHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventPageHeader />);
    expect(baseElement).toBeTruthy();
  });
});
