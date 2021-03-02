import { render } from '@testing-library/react';
import React from 'react';
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
});
