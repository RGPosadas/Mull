import { render } from '@testing-library/react';
import React from 'react';
import ContactRow from './contact-row';

describe('ContactRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContactRow />);
    expect(baseElement).toBeTruthy();
  });
});
