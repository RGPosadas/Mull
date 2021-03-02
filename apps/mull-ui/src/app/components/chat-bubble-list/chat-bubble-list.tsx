import React, { useContext, useEffect, useRef } from 'react';
import { Maybe, Media, Post, User } from '../../../generated/graphql';
import { avatarUrl, formatChatBubbleDate } from '../../../utilities';
import ChatBubble from '../../components/chat-bubble/chat-bubble';
import UserContext from '../../context/user.context';

export interface ChatBubbleListProps {
  posts: Array<
    { __typename?: 'Post' } & Pick<Post, 'id' | 'message' | 'createdTime'> & {
        user: { __typename?: 'User' } & Pick<User, 'id' | 'name'> & {
            avatar?: Maybe<{ __typename?: 'Media' } & Pick<Media, 'id' | 'mediaType'>>;
          };
      }
  >;
}

export const ChatBubbleList = ({ posts, subToMore }: ChatBubbleListProps) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView(); // Scroll to bottom of chat on initial page load
    subToMore();
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to bottom chat smoothly when new post added
  }, [posts]);

  const chatBubbleList = posts.map((post) => {
    return (
      <ChatBubble
        key={post.id}
        isCurrentUser={userId === post.user.id}
        chatDate={formatChatBubbleDate(new Date(post.createdTime))}
        userPicture={avatarUrl(post.user)}
      >
        {post.message}
      </ChatBubble>
    );
  });

  return (
    <div className="chat-bubble-list">
      {chatBubbleList}
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default ChatBubbleList;
