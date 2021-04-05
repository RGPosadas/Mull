import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { FriendStatusButton } from '@mull/types';
import '@testing-library/jest-dom/extend-expect';
import { act, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer, { act as actRenderer } from 'react-test-renderer';
import { ROUTES } from '../../../constants';
import {
  RegistrationMethod,
  RelationshipType,
  User,
  UserRelationshipDocument,
  UserRelationshipQuery,
} from '../../../generated/graphql';
import { UserProvider } from '../../context/user.context';
import ProfileHeader from './profile-header';

describe('ProfileHeader', () => {
  const renderHelper = (history, mocks: MockedResponse[], isCurrentUser: boolean, user: User) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <Router history={history}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ProfileHeader
              isCurrentUser={isCurrentUser}
              portfolioCount={2}
              friendCount={0}
              hostingCount={3}
              user={user}
            />
          </MockedProvider>
        </Router>
      </UserProvider>
    );
  };

  const mockUser: User = {
    id: 4,
    name: 'Candice Runolfsdottir',
    description:
      "Hey, it's Candice! Thanks for following my profile~ I am really passionate about hte environment, so feel free to add me and let us go around helping the environment together!",
    joinDate: '2020-04-28T06:03:28.000Z',
    avatar: null,
    timezone: '',
    email: 'candice@candice.com',
    friends: [],
    registrationMethod: RegistrationMethod.Local,
  };

  it('should render successfully', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.OTHER_USER_PROFILE);
    const { baseElement } = render(renderHelper(history, null, false, mockUser));
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: UserRelationshipDocument,
          variables: { userIdB: mockUser.id },
        },
        result: {
          data: { getUserRelationship: RelationshipType.None } as UserRelationshipQuery,
        },
      },
    ];

    const history = createMemoryHistory();
    history.push(ROUTES.OTHER_USER_PROFILE);
    await actRenderer(async () => {
      const tree = renderer.create(renderHelper(history, mocks, false, mockUser));
      await new Promise((resolve) => setTimeout(resolve, 200));
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  it('should render Friends button successfully', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: UserRelationshipDocument,
          variables: { userIdB: mockUser.id },
        },
        result: {
          data: { getUserRelationship: RelationshipType.Friends } as UserRelationshipQuery,
        },
      },
    ];

    const history = createMemoryHistory();
    history.push(ROUTES.OTHER_USER_PROFILE);
    await act(async () => {
      const utils = render(renderHelper(history, mocks, false, mockUser));
      await new Promise((resolve) => setTimeout(resolve, 200));
      const friendStatusButton = utils.container.querySelector('button[data-testid="mull-button"]');
      expect(friendStatusButton).toHaveTextContent(FriendStatusButton.FRIENDS);
    });
  });

  it('should render Pending button successfully', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: UserRelationshipDocument,
          variables: { userIdB: mockUser.id },
        },
        result: {
          data: { getUserRelationship: RelationshipType.PendingRequest } as UserRelationshipQuery,
        },
      },
    ];

    const history = createMemoryHistory();
    history.push(ROUTES.OTHER_USER_PROFILE);
    await act(async () => {
      const utils = render(renderHelper(history, mocks, false, mockUser));
      await new Promise((resolve) => setTimeout(resolve, 200));
      const friendStatusButton = utils.container.querySelector('button[data-testid="mull-button"]');
      expect(friendStatusButton).toHaveTextContent(FriendStatusButton.PENDING);
    });
  });

  it('should render Add Friend button succesfully when RelationshipType is NONE', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: UserRelationshipDocument,
          variables: { userIdB: mockUser.id },
        },
        result: {
          data: { getUserRelationship: RelationshipType.None } as UserRelationshipQuery,
        },
      },
    ];

    const history = createMemoryHistory();
    history.push(ROUTES.OTHER_USER_PROFILE);
    await act(async () => {
      const utils = render(renderHelper(history, mocks, false, mockUser));
      await new Promise((resolve) => setTimeout(resolve, 200));
      const friendStatusButton = utils.container.querySelector('button[data-testid="mull-button"]');
      expect(friendStatusButton).toHaveTextContent(FriendStatusButton.ADD_FRIEND);
    });
  });

  it('should render Add Friend button succesfully when RelationshipType is ADDED_ME', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: UserRelationshipDocument,
          variables: { userIdB: mockUser.id },
        },
        result: {
          data: { getUserRelationship: RelationshipType.AddedMe } as UserRelationshipQuery,
        },
      },
    ];

    const history = createMemoryHistory();
    history.push(ROUTES.OTHER_USER_PROFILE);
    await act(async () => {
      const utils = render(renderHelper(history, mocks, false, mockUser));
      await new Promise((resolve) => setTimeout(resolve, 200));
      const friendStatusButton = utils.container.querySelector('button[data-testid="mull-button"]');
      expect(friendStatusButton).toHaveTextContent(FriendStatusButton.ADD_FRIEND);
    });
  });
});
