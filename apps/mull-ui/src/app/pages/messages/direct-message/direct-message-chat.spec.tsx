import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { UserProvider } from '../../../context/user.context';
import { DirectMessageChat } from './direct-message-chat';

describe('DirectMessage', () => {
  const renderHelper = (mocks: MockedResponse[], userId: number) => (
    <UserProvider value={{ userId, setUserId: jest.fn() }}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/messages/event/1/announcements']}>
          <Route path="/messages/event/:id/announcements">
            <DirectMessageChat />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    </UserProvider>
  );
  it('should render successfully', () => {
    const { baseElement } = render(<DirectMessageChat />);
    expect(baseElement).toBeTruthy();
  });
});
