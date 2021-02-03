import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import { ParticipantEventsDocument, ParticipantEventsQuery } from '../../../../generated/graphql';
import { UserProvider } from '../../../context/user.context';
import UpcomingPage from './upcoming';

describe('UpcomingPage', () => {
  const renderHelper = (history, mocks: MockedResponse[]) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <UpcomingPage history={history} />
          </Router>
        </MockedProvider>
      </UserProvider>
    );
  };

  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.UPCOMING.url);

    const { baseElement } = render(renderHelper(history, null));
    expect(baseElement).toBeTruthy();
  });

  it('should render eventCards within the upcoming page', async () => {
    await act(async () => {
      const mocks: MockedResponse[] = [
        {
          request: {
            query: ParticipantEventsDocument,
            variables: { userId: 1 },
          },
          result: {
            data: {
              participantEvents: [
                {
                  id: 1,
                  title: 'test',
                  description: 'test',
                  startDate: '2020-12-12T03:00:00.000Z',
                  __typename: 'Event',
                  restriction: 1,
                  location: {
                    title: 'mockTitle',
                  },
                  image: {
                    id: 1,
                    mediaType: 'jpeg',
                  },
                },
              ],
            } as ParticipantEventsQuery,
          },
        },
      ];

      const history = createMemoryHistory();
      history.push(ROUTES.UPCOMING.url);

      const utils = render(renderHelper(history, mocks));

      await new Promise((resolve) => setTimeout(resolve, 0));

      const eventCards = utils.container.querySelector('.event-card-container');
      expect(eventCards).toBeTruthy();
    });
  });
});
