import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { EventTitleDocument, EventTitleQuery } from '../../../../generated/graphql';
import { UserProvider } from '../../../context/user.context';
import EventMessagesHeader from './event-messages-header';

describe('EventMessagesMenu', () => {
  it('should render successfully', () => {
    const mockTitleResponse: MockedResponse[] = [
      {
        request: {
          query: EventTitleDocument,
          variables: { eventId: 1 },
        },
        result: {
          data: {
            event: {
              title: 'Liscar',
              __typename: 'Event',
            },
          } as EventTitleQuery,
        },
      },
    ];
    const { baseElement } = render(
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider>
          <MemoryRouter initialEntries={['messages/event/1']}>
            <Route path="messages/event/:id">
              <EventMessagesHeader>
                <div>Test</div>
              </EventMessagesHeader>
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </UserProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
