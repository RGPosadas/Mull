import { IPost } from '@mull/types';
import React from 'react';
import ChatBubble from '../../components/chat-bubble/chat-bubble';

const isCurrentUser = (currentUserId: number, postUserId: number) => {
  return currentUserId == postUserId;
};

export const chatBubbleList = ({ data }) => {
  if (data) {
    const posts = (data.posts as unknown) as Partial<IPost>[];
    var chatBubbles = posts.map((post) => (
      <ChatBubble
        isCurrentUser={isCurrentUser(data.currentUser.id, post.user.id)}
        chatDate={post.createdTime.toString()}
        userPicture="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
      />
    ));
  }
  return <>{chatBubbles}</>;
};

export default chatBubbleList;
