import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import { PortfolioEventsDocument, PortfolioEventsQuery } from '../../../../generated/graphql';
import { UserProvider } from '../../../context/user.context';
import UserPortfolio from './user-portfolio';

describe('UserPortfolio', () => {
  const renderHelper = (history, mocks: MockedResponse[]) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <UserPortfolio history={history} />
          </Router>
        </MockedProvider>
      </UserProvider>
    );
  };

  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.PROFILE.PORTFOLIO);

    const { baseElement } = render(renderHelper(history, null));
    expect(baseElement).toBeTruthy();
  });

  it('should render eventCards within the user profile portfolio', async () => {
    await act(async () => {
      const mocks: MockedResponse[] = [
        {
          request: {
            query: PortfolioEventsDocument,
          },
          result: {
            data: {
              portfolioEvents: [
                {
                  id: 1,
                  title: 'test',
                  description: 'test',
                  startDate: '2022-12-12T03:00:00.000Z',
                  endDate: '2022-12-13T03:00:00.000Z',
                  __typename: 'Event',
                  location: {
                    title: 'mockTitle',
                  },
                  restriction: 1,
                  image: {
                    id: 1,
                    mediaType: 'jpeg',
                  },
                },
              ],
            } as PortfolioEventsQuery,
          },
        },
      ];

      const history = createMemoryHistory();
      history.push(ROUTES.PROFILE.PORTFOLIO);

      const utils = render(renderHelper(history, mocks));

      await new Promise((resolve) => setTimeout(resolve, 0));

      const eventCards = utils.container.querySelector('.event-card-container');
      expect(eventCards).toBeTruthy();
    });
  });
});
