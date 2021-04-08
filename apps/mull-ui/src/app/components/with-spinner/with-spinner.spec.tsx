import { render } from '@testing-library/react';
import React from 'react';
import { Spinner } from '..';
import withSpinnerHOC from './with-spinner';

describe('WithSpinner', () => {
  it('should render successfully', () => {
    const WrappedComponent = withSpinnerHOC(Spinner);
    const { baseElement } = render(<WrappedComponent isLoading={true} />);
    expect(baseElement).toBeTruthy();
  });
});
