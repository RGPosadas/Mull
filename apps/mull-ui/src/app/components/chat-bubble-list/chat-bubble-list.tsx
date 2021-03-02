import React, { useContext, useEffect } from 'react';
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
  useEffect(() => {
    subToMore();
  }, []);

  const { userId } = useContext(UserContext);

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

  return <div className="chat-bubble-list">{chatBubbleList}</div>;
};

export default ChatBubbleList;
