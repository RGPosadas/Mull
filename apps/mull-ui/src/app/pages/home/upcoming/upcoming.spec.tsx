import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import { GetParticipatingEventsDocument } from '../../../../generated/graphql';
import UpcomingPage from './upcoming';

describe('myEventsPage', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.UPCOMING);

    const { baseElement } = render(
      <MockedProvider>
        <Router history={history}>
          <UpcomingPage />
        </Router>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render eventCards within the upcoming page', async () => {
    await act(async () => {
      const mocks: MockedResponse[] = [
        {
          request: {
            query: GetParticipatingEventsDocument,
            variables: { participatingEventsUserId: 1 },
          },
          result: {
            data: {
              participatingEvents: [
                {
                  id: '1',
                  title: 'test',
                  description: 'test',
                  startDate: '2020-12-12T03:00:00.000Z',
                  endDate: '2020-12-11T17:00:00.000Z',
                  __typename: 'Event',
                },
              ],
            },
          },
        },
      ];

      const history = createMemoryHistory();
      history.push(ROUTES.UPCOMING);

      const utils = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <UpcomingPage />
          </Router>
        </MockedProvider>
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      const eventCards = utils.container.querySelector('.event-card-container');
      expect(eventCards).toBeTruthy();
    });
  });
});
