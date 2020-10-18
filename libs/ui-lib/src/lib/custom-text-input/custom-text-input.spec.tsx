import React from 'react';
import { render } from '@testing-library/react';

import CustomTextInput from './custom-text-input';

describe('CustomTextInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomTextInput />);
    expect(baseElement).toBeTruthy();
  });
});
