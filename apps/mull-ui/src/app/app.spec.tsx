import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

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
