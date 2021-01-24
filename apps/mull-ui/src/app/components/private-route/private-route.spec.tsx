import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { UserProvider } from '../../context/user.context';
import NotFoundPage from '../../pages/404/not-found';
import PrivateRoute from './private-route';

describe('PrivateRoute', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(
      <Router history={history}>
        <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
          <PrivateRoute component={NotFoundPage} />
        </UserProvider>
      </Router>
    );
    expect(baseElement).toBeTruthy();
  });
});
