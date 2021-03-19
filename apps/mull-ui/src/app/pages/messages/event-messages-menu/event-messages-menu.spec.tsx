import React from 'react';
import { render } from '@testing-library/react';

import EventMessagesMenu from './event-messages-menu';

describe('EventMessagesMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventMessagesMenu />);
    expect(baseElement).toBeTruthy();
  });
});
