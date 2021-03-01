import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import { mockPosts } from '../../../constants';
import { UserProvider } from '../../context/user.context';
import ChatBubbleList from './chat-bubble-list';

describe('ChatBubble', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <ChatBubbleList posts={mockPosts} />
      </UserProvider>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
          <ChatBubbleList posts={mockPosts} />
        </UserProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
