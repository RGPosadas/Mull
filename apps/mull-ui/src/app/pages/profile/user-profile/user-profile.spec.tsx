import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { ROUTES } from '../../../../constants';
import { UserProfileDocument, UserProfileQuery } from '../../../../generated/graphql';
import { UserProvider } from '../../../context/user.context';
import UserProfilePage from './user-profile';

describe('UserProfilePage', () => {
  const renderHelper = (history, mocks: MockedResponse[]) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <UserProfilePage />
          </Router>
        </MockedProvider>
      </UserProvider>
    );
  };
  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.PROFILE.DISPLAY);

    const { baseElement } = render(renderHelper(history, null));
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: UserProfileDocument,
          variables: {
            id: 1,
          },
        },
        result: {
          data: {
            user: {
              id: 1,
              name: 'Jane Doe',
              description: 'a description',
              avatar: null,
              joinDate: '2021-02-19T14:46:13.000Z',
            },
            friendCount: 0,
            hostingCount: 1,
            portfolioCount: 0,
          } as UserProfileQuery,
        },
      },
    ];

    const history = createMemoryHistory();
    history.push(ROUTES.PROFILE.DISPLAY);
    await act(async () => {
      const tree = renderer.create(renderHelper(history, mocks));
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
