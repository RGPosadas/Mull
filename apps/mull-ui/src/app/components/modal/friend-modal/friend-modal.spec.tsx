import { render } from '@testing-library/react';
import React from 'react';
import FriendModal from './friend-modal';

describe('FriendModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FriendModal
        open={true}
        setOpen={() => {
          /* noop */
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
