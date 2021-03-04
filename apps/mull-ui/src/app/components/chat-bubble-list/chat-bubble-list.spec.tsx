import { render } from '@testing-library/react';
import React from 'react';
import { mockPosts } from '../../../constants';
import { UserProvider } from '../../context/user.context';
import ChatBubbleList from './chat-bubble-list';

describe('ChatBubble', () => {
  it('should render successfully', () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
    const { baseElement } = render(
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <ChatBubbleList posts={mockPosts} subToMore={jest.fn()} />
      </UserProvider>
    );

    expect(baseElement).toBeTruthy();
  });
});
