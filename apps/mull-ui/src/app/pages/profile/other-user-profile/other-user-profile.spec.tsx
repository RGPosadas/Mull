import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer, { act as actRenderer } from 'react-test-renderer';
import { ROUTES } from '../../../../../src/constants';
import {
  OtherUserProfileDocument,
  OtherUserProfileQuery,
  RelationshipType,
  UserRelationshipDocument,
  UserRelationshipQuery,
} from '../../../../generated/graphql';
import { UserProvider } from '../../../context/user.context';
import { OtherUserProfilePage } from './other-user-profile';

describe('OtherUserProfile', () => {
  const renderHelper = (history, mocks: MockedResponse[]) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <OtherUserProfilePage history={history} prevPage="Add Friends" />
          </Router>
        </MockedProvider>
      </UserProvider>
    );
  };

  const otherUserMock: MockedResponse = {
    request: {
      query: OtherUserProfileDocument,
      variables: {
        id: 4,
      },
    },
    result: {
      data: {
        user: {
          id: 4,
          name: 'Candice Runolfsdottir',
          description:
            "Hey, it's Candice! Thanks for following my profile~ I am really passionate about hte environment, so feel free to add me and let us go around helping the environment together!",
          joinDate: '2020-04-28T06:03:28.000Z',
          avatar: null,
        },
        friendCount: 2,
        hostingCount: 3,
        portfolioCount: 1,
        portfolioEvents: [
          {
            id: 9,
            title: 'my event',
            restriction: 0,
            startDate: '2009-06-15T13:45:30',
            endDate: '2009-07-15T13:45:30',
            location: {
              title: '51067 Schimmel Cliff, North Christop, Connecticut, 75399-7391',
            },
            image: { id: 10, mediaType: 'jpeg' },
          },
        ],
      } as OtherUserProfileQuery,
    },
  };

  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.OTHER_USER_PROFILE);

    const { baseElement } = render(renderHelper(history, null));
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', async () => {
    const mocks: MockedResponse[] = [
      otherUserMock,
      {
        request: {
          query: UserRelationshipDocument,
          variables: {
            userIdB: 4,
          },
        },
        result: {
          data: { getUserRelationship: RelationshipType.None } as UserRelationshipQuery,
        },
      },
    ];

    const history = createMemoryHistory();
    history.push(ROUTES.OTHER_USER_PROFILE);
    await actRenderer(async () => {
      const tree = renderer.create(renderHelper(history, mocks));
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
