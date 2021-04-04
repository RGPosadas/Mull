import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer, { act as actRenderer } from 'react-test-renderer';
import { ROUTES } from '../../../../../src/constants';
import { GetTrueFriendsDocument, GetTrueFriendsQuery } from '../../../../generated/graphql';
import { UserProvider } from '../../../context/user.context';
import MyFriends from './myFriends-profile';

describe('MyFriends', () => {
  const renderHelper = (history, mocks: MockedResponse[]) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <MyFriends history={history} />
          </Router>
        </MockedProvider>
      </UserProvider>
    );
  };

  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(renderHelper(history, null));
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GetTrueFriendsDocument,
        },
        result: {
          data: {
            getTrueFriends: [
              {
                id: 1,
                name: 'Zoro',
                avatar: null,
              },
              {
                id: 2,
                name: 'Luffy',
                avatar: null,
              },
              {
                id: 3,
                name: 'Nami',
                avatar: null,
              },
            ],
          } as GetTrueFriendsQuery,
        },
      },
    ];

    const history = createMemoryHistory();
    history.push(ROUTES.MY_FRIENDS);
    await actRenderer(async () => {
      const tree = renderer.create(renderHelper(history, mocks));
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
