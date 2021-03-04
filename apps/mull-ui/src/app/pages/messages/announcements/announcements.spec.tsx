import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { act, render } from '@testing-library/react';
import { mockChannelWithPosts, ROUTES } from 'apps/mull-ui/src/constants';
import { ChannelByEventDocument } from 'apps/mull-ui/src/generated/graphql';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { UserProvider } from '../../../context/user.context';
import AnnouncementsPage from './announcements';

describe('Announcements', () => {
  const renderHelper = (history, mocks: MockedResponse[], userId: number) => (
    <UserProvider value={{ userId, setUserId: jest.fn() }}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <AnnouncementsPage />
        </Router>
      </MockedProvider>
    </UserProvider>
  );
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
          eventId: 4,
          channelName: 'Announcements',
        },
      },
      result: {
        data: {
          getChannelByEvent: mockChannelWithPosts,
        },
      },
    },
  ];

  it('should have a chatInput', async () => {
    await act(async () => {
      window.HTMLElement.prototype.scrollIntoView = function () {};
      const history = createMemoryHistory();
      history.push(ROUTES.ANNOUNCEMENTS.url);
      const utils = render(renderHelper(history, mocks, mockChannelWithPosts.event.host.id));
      await new Promise((resolve) => setTimeout(resolve, 0));
      const chatInput = utils.getByTestId('announcement-chat-input') as HTMLFormElement;
      expect(chatInput).toBeTruthy();
    });
  });

  it('should not have a chatInput', async () => {
    await act(async () => {
      window.HTMLElement.prototype.scrollIntoView = function () {};
      const history = createMemoryHistory();
      history.push(ROUTES.ANNOUNCEMENTS.url);
      const utils = render(renderHelper(history, mocks, -100));
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(utils.queryByTestId('announcement-chat-input')).toBeFalsy();
    });
  });
});
