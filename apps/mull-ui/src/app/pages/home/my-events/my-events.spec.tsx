import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import { OwnedEventsDocument } from '../../../../generated/graphql';
import MyEventsPage from './my-events';

describe('myEventsPage', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.MY_EVENTS.url);

    const { baseElement } = render(
      <MockedProvider>
        <Router history={history}>
          <MyEventsPage history={history} />
        </Router>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render eventCards within the my-events page', async () => {
    await act(async () => {
      const mocks: MockedResponse[] = [
        {
          request: {
            query: OwnedEventsDocument,
            variables: { userId: 1 },
          },
          result: {
            data: {
              coHostEvents: [
                {
                  id: '1',
                  title: 'test',
                  description: 'test',
                  startDate: '2020-12-12T03:00:00.000Z',
                  location: {
                    title: 'mockTitle',
                  },
                  restriction: 0,
                  image: {
                    id: 1,
                    mediaType: 'jpeg',
                  },
                  __typename: 'Event',
                },
              ],
              hostEvents: [
                {
                  id: '2',
                  title: 'test',
                  description: 'test',
                  startDate: '2020-12-12T03:00:00.000Z',
                  location: {
                    title: 'mockTitle',
                  },
                  restriction: 1,
                  image: {
                    id: 1,
                    mediaType: 'jpeg',
                  },
                  __typename: 'Event',
                },
              ],
            },
          },
        },
      ];

      const history = createMemoryHistory();
      history.push(ROUTES.MY_EVENTS.url);

      const utils = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <MyEventsPage history={history} />
          </Router>
        </MockedProvider>
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      const eventCards = utils.container.querySelector('.event-card-container');
      expect(eventCards).toBeTruthy();
    });
  });
});
