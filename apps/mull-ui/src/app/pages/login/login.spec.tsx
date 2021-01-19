import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { UserProvider } from '../../context/user.context';
import Login from './login';

describe('Login', () => {
  const renderHelper = (history: History) => {
    const setUserId = jest.fn();
    const userId = null,
      accessToken = null;
    const setAccessToken = jest.fn();
    const { location } = window;
    // Stops tests from being redirected to OAuth Provider websites
    beforeEach(() => {
      delete window.location;
      window.location = {
        assign: jest.fn(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
    });
    afterEach(() => {
      window.location = location;
    });

    return (
      <UserProvider value={{ userId, setUserId, accessToken, setAccessToken }}>
        <MockedProvider>
          <Router history={history}>
            <Login history={history} />
          </Router>
        </MockedProvider>
      </UserProvider>
    );
  };

  it('should render successfully', () => {
    const history = createMemoryHistory();

    const { baseElement } = render(renderHelper(history));

    expect(baseElement).toBeTruthy();
  });

  it('should have validation errors', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.LOGIN);

    const utils = render(renderHelper(history));
    const submitButton = utils.container.querySelector('button.login');
    await act(async () => {
      fireEvent.click(submitButton);
    });

    const error = utils.container.querySelector('span[class="error-message"]');
    expect(error).toHaveTextContent('Email is required.');
  });

  it('should submit a users login credentials', async () => {
    await act(async () => {
      const history = createMemoryHistory();
      history.push(ROUTES.LOGIN);
      const utils = render(renderHelper(history));
      let input = utils.getByLabelText('Email');
      fireEvent.change(input, { target: { value: 'test.email@email.com' } });
      input = utils.getByLabelText('Password');
      fireEvent.change(input, { target: { value: 'password123' } });
      const submitButton = utils.container.querySelector('button[type="submit"]');
      fireEvent.click(submitButton);
    });
  });

  it('should redirect to OAuth providers', async () => {
    await act(async () => {
      const history = createMemoryHistory();
      const oAuthProviders = ['Google', 'Facebook', 'Twitter'];
      history.push(ROUTES.LOGIN);

      const utils = render(renderHelper(history));
      for (const provider of oAuthProviders) {
        const oAuthButton = utils.getByText(`Continue with ${provider}`);
        fireEvent.click(oAuthButton);
      }
    });
  });
});
