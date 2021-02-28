import { Post } from 'apps/mull-ui/src/generated/graphql';
import { avatarUrl } from 'apps/mull-ui/src/utilities';
import React from 'react';
import ChatBubble from '../../components/chat-bubble/chat-bubble';

const formatDate = (date: Date) => {
  return `${date.getHours()}:${String(date.getMinutes()).padStart(
    2,
    '0'
  )} ${date.toLocaleDateString()}`;
};

export const chatBubbleList = ({ data }) => {
  if (data) {
    const posts = data.posts as Post[];
    var chatBubbleList = posts.map((post) => (
      <ChatBubble
        isCurrentUser={data.currentUser.id == post.user.id}
        chatDate={formatDate(post.createdTime)}
        userPicture={avatarUrl(post.user)}
      >
        {post.message}
      </ChatBubble>
    ));

    return <>{chatBubbleList}</>;
  }
};

export default chatBubbleList;
