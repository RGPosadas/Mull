import React, { useContext } from 'react';
import { Post } from '../../../generated/graphql';
import { avatarUrl, formatChatBubbleDate } from '../../../utilities';
import ChatBubble from '../../components/chat-bubble/chat-bubble';
import UserContext from '../../context/user.context';

export interface ChatBubbleListProps {
  posts: Post[];
}

export const ChatBubbleList = ({ posts }: ChatBubbleListProps) => {
  const { userId } = useContext(UserContext);
  const chatBubbleList = posts.map((post) => (
    <ChatBubble
      key={post.id}
      isCurrentUser={userId === post.user.id}
      chatDate={formatChatBubbleDate(post.createdTime)}
      userPicture={avatarUrl(post.user)}
    >
      {post.message}
    </ChatBubble>
  ));

  return <div className="chat-bubble-list">{chatBubbleList}</div>;
};

export default ChatBubbleList;
