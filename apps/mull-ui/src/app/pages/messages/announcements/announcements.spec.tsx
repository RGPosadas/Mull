import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { act, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { mockChannelWithPosts, ROUTES } from '../../../../../src/constants';
import { ChannelByEventDocument, PostAddedDocument } from '../../../../generated/graphql';
import { UserProvider } from '../../../context/user.context';
import AnnouncementsPage from './announcements';

describe('Announcements', () => {
  const renderHelper = (history, mocks: MockedResponse[], userId: number) => (
    <UserProvider value={{ userId, setUserId: jest.fn() }}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <AnnouncementsPage history={history} />
        </Router>
      </MockedProvider>
    </UserProvider>
  );
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollIntoView = function () {};
  });

  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.ANNOUNCEMENTS.url);

    const { baseElement } = render(renderHelper(history, null, 3));

    expect(baseElement).toBeTruthy();
  });

  const mocks: MockedResponse[] = [
    {
      request: {
        query: ChannelByEventDocument,
        variables: {
          eventId: 1,
          channelName: 'Announcements',
        },
      },
      result: {
        data: {
          getChannelByEvent: mockChannelWithPosts,
        },
      },
    },
    {
      request: {
        query: PostAddedDocument,
        variables: {
          channelId: 3,
        },
      },
      result: {
        data: {
          postAdded: {
            id: 1,
            createdTime: new Date(),
            message: 'message',
            user: {
              id: 1,
              name: 'someone',
              avatar: {
                id: 3,
                mediaType: 'png',
              },
              __typename: 'User',
            },
            __typename: 'Post',
          },
        },
      },
    },
  ];

  it('should have a chatInput', async () => {
    await act(async () => {
      const history = createMemoryHistory();
      history.push(ROUTES.ANNOUNCEMENTS.url);
      const utils = render(renderHelper(history, mocks, mockChannelWithPosts.event.host.id));
      await new Promise((resolve) => setTimeout(resolve, 0));
      const chatInput = utils.getByTestId('announcement-chat-input') as HTMLFormElement;
      expect(chatInput).toBeTruthy();
    });
  });

  it('should not have a chatInput because user is not host', async () => {
    await act(async () => {
      const history = createMemoryHistory();
      history.push(ROUTES.ANNOUNCEMENTS.url);
      const utils = render(renderHelper(history, mocks, -100));
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(utils.queryByTestId('announcement-chat-input')).toBeFalsy();
    });
  });
});
