import { render } from '@testing-library/react';
import React from 'react';
import PrivateRoute from './private-route';

describe('PrivateRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PrivateRoute />);
    expect(baseElement).toBeTruthy();
  });
});
