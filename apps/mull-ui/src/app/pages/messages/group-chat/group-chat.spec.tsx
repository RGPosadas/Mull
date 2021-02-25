import React from 'react';
import { render } from '@testing-library/react';

import GroupChat from './group-chat';

describe('GroupChat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupChat />);
    expect(baseElement).toBeTruthy();
  });
});
