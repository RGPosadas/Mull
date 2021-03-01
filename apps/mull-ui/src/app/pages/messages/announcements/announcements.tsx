import React from 'react';
import { mockPosts } from '../../../../constants';
import { ChatInput } from '../../../components';
import ChatBubbleList from '../../../components/chat-bubble-list/chat-bubble-list';

export const AnnouncementsPage = () => {
  // TODO: Replace the following with the real announcement page implementation

  return (
    <div className="announcement-page">
      <ChatBubbleList posts={mockPosts} />
      <ChatInput />
    </div>
  );
};
export default AnnouncementsPage;
