import React from 'react';
import { render } from '@testing-library/react';

import DateCalendar from './date-calendar';

describe('DateCalendar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateCalendar />);
    expect(baseElement).toBeTruthy();
  });
});
