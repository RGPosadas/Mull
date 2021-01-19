import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { RegistrationMethod } from '@mull/types';
import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { CreateUserDocument } from '../../../generated/graphql';
import { UserProvider } from '../../context/user.context';
import Register from './register';

describe('Register', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderHelper = (history: History, mocks: MockedResponse<Record<string, any>>[] = []) => {
    const setUserId = jest.fn();
    const userId = null,
      accessToken = null;
    const setAccessToken = jest.fn();

    return (
      <UserProvider value={{ userId, setUserId, accessToken, setAccessToken }}>
        <MockedProvider mocks={mocks}>
          <Router history={history}>
            <Register history={history} />
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
    history.push(ROUTES.REGISTER);

    const utils = render(renderHelper(history));
    const submitButton = utils.container.querySelector('button[type="submit"]');
    await act(async () => {
      fireEvent.click(submitButton);
    });
    const error = utils.container.querySelector('span[class="error-message"]');
    expect(error).toHaveTextContent('Name is required.');
  });

  it('should submit a users login credentials', async () => {
    await act(async () => {
      const history = createMemoryHistory();
      history.push(ROUTES.REGISTER);
      const mocks: MockedResponse[] = [
        {
          request: {
            query: CreateUserDocument,
            variables: {
              createUserInput: {
                name: 'John Doe',
                email: 'abc@def.com',
                password: 'abc123',
                registrationMethod: RegistrationMethod.LOCAL,
              },
            },
          },
          result: {
            data: { createUser: { id: 10 } },
          },
        },
      ];

      const utils = render(renderHelper(history, mocks));

      let input = utils.getByLabelText('Name');
      fireEvent.change(input, { target: { value: 'John' } });
      input = utils.getByLabelText('Email');
      fireEvent.change(input, { target: { value: 'test.email@email.com' } });
      input = utils.getByLabelText('Password');
      fireEvent.change(input, { target: { value: 'password123' } });
      const submitButton = utils.container.querySelector('button[type="submit"]');
      await waitFor(() => {
        fireEvent.click(submitButton);
      });
    });
  });
});
