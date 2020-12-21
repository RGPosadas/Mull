import React from 'react';
import { act, render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import UpcomingPage, { GET_PARTICIPATING_EVENTS } from './upcoming';
import { ROUTES } from '../../../../constants';

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
            query: GET_PARTICIPATING_EVENTS,
            variables: { participatingEventsUserId: 3 },
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
