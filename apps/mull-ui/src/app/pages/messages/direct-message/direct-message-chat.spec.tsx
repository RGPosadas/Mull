import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { UserProvider } from '../../../context/user.context';
import { DirectMessageChat } from './direct-message-chat';

describe('DirectMessage', () => {
  const renderHelper = (mocks: MockedResponse[], userId: number, history: History) => (
    <UserProvider value={{ userId, setUserId: jest.fn() }}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/messages/dm/2']}>
          <Route path="/messages/dm/:friendId">
            <DirectMessageChat history={history} />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    </UserProvider>
  );

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollIntoView = function () {};
  });

  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(renderHelper([], 1, history));
    expect(baseElement).toBeTruthy();
  });
});
