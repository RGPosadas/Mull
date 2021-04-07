import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { UserProvider } from '../../../../context/user.context';
import DirectMessageListPage from './direct-message-list';

describe('DirectMessage', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider>
          <Router history={history}>
            <DirectMessageListPage history={history} />
          </Router>
        </MockedProvider>
      </UserProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
