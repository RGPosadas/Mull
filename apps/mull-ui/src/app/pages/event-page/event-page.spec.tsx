import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ISerializedEvent } from '@mull/types';
import { act, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { dummyEvent } from '../../../constants';
import { environment } from '../../../environments/environment';
import {
  EventPageDocument,
  EventPageQuery,
  UserDocument,
  UserQuery,
} from '../../../generated/graphql';
import { UserProvider } from '../../context/user.context';
import EventPage from './event-page';

describe('EventPage', () => {
  const renderHelper = (event: ISerializedEvent, mocks: MockedResponse[]) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={['events/1']}>
            <Route path="events/:id">
              <EventPage reviewEvent={event} prevPage="" eventImageURL="" />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </UserProvider>
    );
  };

  it('should render successfully', () => {
    const { baseElement } = render(renderHelper(dummyEvent, null));
    expect(baseElement).toBeTruthy();
  });

  it('should show queried user information', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: UserDocument,
          variables: { userId: 1 },
        },
        result: {
          data: {
            user: {
              id: 1,
              name: 'Test user',
            },
          } as UserQuery,
        },
      },
    ];

    const utils = render(renderHelper(dummyEvent, mocks));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(utils.getByTestId('event-page-host').textContent).toEqual('Test user');
  });

  it('should show queried event information', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: EventPageDocument,
          variables: { eventId: 1 },
        },
        result: {
          data: {
            event: {
              id: 1,
              title: 'Test title',
              description: 'Test Description',
              startDate: '2020-12-12T03:00:00.000Z',
              endDate: '2020-12-12T03:00:00.000Z',
              host: {
                id: 1,
                name: 'Test user 2',
              },
              restriction: 1,
              image: {
                id: 1,
                mediaType: 'jpeg',
              },
              location: {
                title: 'Test Location',
              },
              __typename: 'Event',
            },
            isParticipant: true,
          } as EventPageQuery,
        },
      },
    ];

    const utils = render(renderHelper(null, mocks));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(utils.getByTestId('event-page-title').textContent).toEqual('Test title');
    expect(utils.getByTestId('event-page-host').textContent).toEqual('Test user 2');
    expect(utils.getByTestId('event-page-location').textContent).toEqual('Test Location');
    expect(utils.getByTestId('event-page-location').textContent).toEqual('Test Location');
    expect(utils.getByTestId('event-page-image').getAttribute('src')).toEqual(
      `${environment.backendUrl}/api/media/1`
    );
  });
});
