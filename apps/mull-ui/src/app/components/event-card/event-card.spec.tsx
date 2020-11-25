import React from 'react';
import { render } from '@testing-library/react';

import EventCard from './event-card';

describe('EventCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventCard />);
    expect(baseElement).toBeTruthy();
  });
});
