import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import ChatBubbleList from './chat-bubble-list';

const mockPosts = [
  {
    user: {
      id: 1,
      avatar: null,
    },
    message: 'message 1 from user 1, current user id is 1',
    createdTime: new Date(),
  },
  {
    user: {
      id: 2,
      avatar: null,
    },
    message: 'message 2 from user 2',
    createdTime: new Date(),
  },
  {
    user: {
      id: 3,
      avatar: { id: 1 },
    },
    message: 'message 3 from user 3',
    createdTime: new Date(),
  },
];

const mockCurrentUser = {
  id: 1,
};

describe('ChatBubble', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ChatBubbleList
        data={{
          posts: mockPosts,
          currentUser: mockCurrentUser,
        }}
      />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <ChatBubbleList
          data={{
            posts: mockPosts,
            currentUser: mockCurrentUser,
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
