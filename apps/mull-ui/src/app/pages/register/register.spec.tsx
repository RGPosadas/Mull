import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import Register from './register';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ROUTES } from '../../../constants';

describe('Register', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(
      <MockedProvider>
        <Router history={history}>
          <Register history={history} />
        </Router>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have validation errors', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.REGISTER);
    const utils = render(
      <MockedProvider>
        <Router history={history}>
          <Register history={history} />
        </Router>
      </MockedProvider>
    );
    const submitButton = utils.container.querySelector('button[type="submit"]');
    await waitFor(() => {
      fireEvent.click(submitButton);
    });
    const error = utils.container.querySelector('span[class="error-message"]');
    expect(error).toHaveTextContent('Name is required.');
  });

  it('should submit a users login credentials', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.REGISTER);
    const utils = render(
      <MockedProvider>
        <Router history={history}>
          <Register history={history} />
        </Router>
      </MockedProvider>
    );
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
