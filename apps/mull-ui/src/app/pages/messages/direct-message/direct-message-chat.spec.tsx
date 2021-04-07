import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';
import { act, render } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import {
  DirectMessageDocument,
  DirectMessageHeaderDocument,
  PostAddedDocument,
} from '../../../../generated/graphql';
import { mockDmChannelWithPosts } from '../../../../mockdata';
import { UserProvider } from '../../../context/user.context';
import { DirectMessageChat } from './direct-message-chat';

describe('DirectMessage', () => {
  const renderHelper = (mocks: MockedResponse[], userId: number, history: History) => (
    <UserProvider value={{ userId, setUserId: jest.fn() }}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/messages/dm/2']}>
          <Route path="/messages/dm/:friendId">
            <DirectMessageChat history={history} />
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
    const history = createMemoryHistory();
    const { baseElement } = render(renderHelper(null, 1, history));
    expect(baseElement).toBeTruthy();
  });

  const mocks: MockedResponse[] = [
    {
      request: {
        query: DirectMessageDocument,
        variables: {
          friendUserId: 2,
        },
      },
      result: {
        data: {
          getDirectMessageChannel: mockDmChannelWithPosts,
        },
      },
    },
    {
      request: {
        query: PostAddedDocument,
        variables: {
          channelId: 4,
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
    {
      request: {
        query: DirectMessageHeaderDocument,
        variables: {
          userId: 2,
        },
      },
      result: {
        data: { user: { avatar: null, name: 'Brock Hampton' } },
      },
    },
  ];

  it('should have a chatInput', async () => {
    await act(async () => {
      const history = createMemoryHistory();
      const utils = render(renderHelper(mocks, 1, history));
      await new Promise((resolve) => setTimeout(resolve, 0));
      const chatInput = utils.getByTestId('chat-input') as HTMLFormElement;
      expect(chatInput).toBeTruthy();
    });
  });

  it('should have the correct name on the chat header', async () => {
    await act(async () => {
      const history = createMemoryHistory();
      const utils = render(renderHelper(mocks, 1, history));
      await new Promise((resolve) => setTimeout(resolve, 0));
      const chatInput = utils.getByTestId('direct-message-header') as HTMLDivElement;
      expect(chatInput).toHaveTextContent('Brock Hampton');
    });
  });
});
