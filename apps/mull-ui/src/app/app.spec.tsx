import React from 'react';
import App from './app';

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MockedProvider>
    );

    expect(baseElement).toBeTruthy();
  });
});
