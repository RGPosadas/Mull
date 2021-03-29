import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { act, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { mockChannelWithPosts } from '../../../../../src/mockdata';
import { ChannelByEventIdDocument, PostAddedDocument } from '../../../../generated/graphql';
import { UserProvider } from '../../../context/user.context';
import EventChat from './event-chat';

describe('Event Chat', () => {
  const renderHelper = (mocks: MockedResponse[], userId: number) => (
    <UserProvider value={{ userId, setUserId: jest.fn() }}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/messages/event/1/announcements']}>
          <Route path="/messages/event/:id/announcements">
            <EventChat channelName="Announcements" restrictChatInput />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    </UserProvider>
  );
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollIntoView = function () {};
  });

  it('should render successfully', () => {
    const { baseElement } = render(renderHelper(null, 3));

    expect(baseElement).toBeTruthy();
  });

  const mocks: MockedResponse[] = [
    {
      request: {
        query: ChannelByEventIdDocument,
        variables: {
          eventId: 1,
          channelName: 'Announcements',
        },
      },
      result: {
        data: {
          getChannelByEventId: mockChannelWithPosts,
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
      const utils = render(renderHelper(mocks, mockChannelWithPosts.event.host.id));
      await new Promise((resolve) => setTimeout(resolve, 0));
      const chatInput = utils.getByTestId('chat-input') as HTMLFormElement;
      expect(chatInput).toBeTruthy();
    });
  });

  it('should not have a chatInput because user is not host', async () => {
    await act(async () => {
      const utils = render(renderHelper(mocks, -100));
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(utils.queryByTestId('chat-input')).toBeFalsy();
    });
  });
});
