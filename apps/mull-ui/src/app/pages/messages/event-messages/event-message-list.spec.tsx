import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { ROUTES } from '../../../../constants';
import {
  OwnedEventsDocument,
  OwnedEventsQuery,
  ParticipantEventsDocument,
  ParticipantEventsQuery,
} from '../../../../generated/graphql';
import { UserProvider } from '../../../context/user.context';
import EventMessageList from './event-message-list';

describe('EventMessageList', () => {
  const renderHelper = (history, mocks: MockedResponse[]) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <EventMessageList />
          </Router>
        </MockedProvider>
      </UserProvider>
    );
  };

  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.EVENT_MESSAGE_LIST);

    const { baseElement } = render(renderHelper(history, null));
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: ParticipantEventsDocument,
        },
        result: {
          data: {
            participantEvents: [
              {
                id: 1,
                title: 'Test title',
                description: 'Test Description',
                startDate: '2020-12-12T03:00:00.000Z',
                endDate: '2020-12-12T03:00:00.000Z',
                host: {
                  id: 1,
                  name: 'Test user 2',
                },
                restriction: 0,
                image: {
                  id: 1,
                  mediaType: 'jpeg',
                },
                location: {
                  title: 'Test Location',
                },
              },
            ],
          } as ParticipantEventsQuery,
        },
      },
      {
        request: {
          query: OwnedEventsDocument,
        },
        result: {
          data: {
            hostEvents: [
              {
                id: 2,
                title: 'Test title',
                description: 'Test Description',
                startDate: '2020-12-12T03:00:00.000Z',
                endDate: '2020-12-12T03:00:00.000Z',
                host: {
                  id: 1,
                  name: 'Test user 2',
                },
                restriction: 0,
                image: {
                  id: 1,
                  mediaType: 'jpeg',
                },
                location: {
                  title: 'Test Location',
                },
              },
            ],
            coHostEvents: [
              {
                id: 3,
                title: 'Test title',
                description: 'Test Description',
                startDate: '2020-12-12T03:00:00.000Z',
                endDate: '2020-12-12T03:00:00.000Z',
                host: {
                  id: 1,
                  name: 'Test user 2',
                },
                restriction: 0,
                image: {
                  id: 1,
                  mediaType: 'jpeg',
                },
                location: {
                  title: 'Test Location',
                },
              },
            ],
          } as OwnedEventsQuery,
        },
      },
    ];
    const history = createMemoryHistory();
    history.push(ROUTES.EVENT_MESSAGE_LIST);

    await act(async () => {
      const tree = renderer.create(renderHelper(history, mocks));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
