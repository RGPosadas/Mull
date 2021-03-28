import React from 'react';
import { render } from '@testing-library/react';

import FriendModal from './friend-modal';

describe('FriendModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FriendModal />);
    expect(baseElement).toBeTruthy();
  });
});
