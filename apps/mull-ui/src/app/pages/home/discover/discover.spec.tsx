import React from 'react';
import { act, render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import DiscoverPage, { GET_DISCOVER_EVENTS } from './discover';
import { ROUTES } from '../../../../constants';

describe('discoverPage', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.DISCOVER);

    const { baseElement } = render(
      <MockedProvider>
        <Router history={history}>
          <DiscoverPage />
        </Router>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render eventCards within the discover page', async () => {
    await act(async () => {
      const mocks: MockedResponse[] = [
        {
          request: {
            query: GET_DISCOVER_EVENTS,
            variables: { discoverEventsUserId: 1 },
          },
          result: {
            data: {
              discoverEvents: [
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
      history.push(ROUTES.DISCOVER);

      const utils = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <DiscoverPage />
          </Router>
        </MockedProvider>
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      const eventCards = utils.container.querySelector('.event-card-container');
      expect(eventCards).toBeTruthy();
    });
  });
});
