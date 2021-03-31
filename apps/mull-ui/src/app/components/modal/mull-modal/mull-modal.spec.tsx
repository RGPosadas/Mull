import { render } from '@testing-library/react';
import React from 'react';
import MullModal from './mull-modal';

describe('MullModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MullModal
        open={true}
        setOpen={() => {
          /* noop */
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
