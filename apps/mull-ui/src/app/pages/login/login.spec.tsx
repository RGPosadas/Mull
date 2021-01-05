import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import Login from './login';

describe('Login', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(
      <MockedProvider>
        <Router history={history}>
          <Login history={history} />
        </Router>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have validation errors', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.LOGIN);
    const utils = render(
      <MockedProvider>
        <Router history={history}>
          <Login history={history} />
        </Router>
      </MockedProvider>
    );
    const submitButton = utils.container.querySelector('button.login');
    await waitFor(() => {
      fireEvent.click(submitButton);
    });
    const error = utils.container.querySelector('span[class="error-message"]');
    expect(error).toHaveTextContent('Email is required.');
  });

  it('should submit a users login credentials', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.LOGIN);
    const utils = render(
      <MockedProvider>
        <Router history={history}>
          <Login history={history} />
        </Router>
      </MockedProvider>
    );
    let input = utils.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'test.email@email.com' } });
    input = utils.getByLabelText('Password');
    fireEvent.change(input, { target: { value: 'password123' } });
    const submitButton = utils.container.querySelector('button[type="submit"]');
    await waitFor(() => {
      fireEvent.click(submitButton);
    });
  });

  it('should redirect to OAuth providers', async () => {
    const history = createMemoryHistory();
    const oAuthProviders = ['Google', 'Facebook', 'Twitter'];
    history.push(ROUTES.LOGIN);
    const utils = render(
      <MockedProvider>
        <Router history={history}>
          <Login history={history} />
        </Router>
      </MockedProvider>
    );
    for (const provider of oAuthProviders) {
      const oAuthButton = utils.getByText(`Continue with ${provider}`);
      fireEvent.click(oAuthButton);
    }
  });
});
