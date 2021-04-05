import { ISerializedPost } from '@mull/types';
import { History } from 'history';
import React, { useContext, useEffect, useRef } from 'react';
import { avatarUrl, formatChatBubbleDate, getMediaUrl } from '../../../utilities';
import ChatBubble from '../../components/chat-bubble/chat-bubble';
import UserContext from '../../context/user.context';
import './chat-bubble-list.scss';

export interface ChatBubbleListProps {
  history: History;
  posts: Partial<ISerializedPost>[];
  subToMore: () => void;
}

export const ChatBubbleList = ({ history, posts, subToMore }: ChatBubbleListProps) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView(); // Scroll to bottom of chat on initial page load
    subToMore();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    setTimeout(() => messageEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100); // wait a little and scroll to bottom chat smoothly when new post added
  }, [posts]);

  // Copying because sometimes array is readonly (due to originating from query) and can't be sorted
  const postsCopy = [...posts];

  const chatBubbleList = postsCopy
    .sort((post1, post2) => {
      const date1 = new Date(post1.createdTime);
      const date2 = new Date(post2.createdTime);
      return date1.getTime() - date2.getTime();
    })
    .map((post) => {
      return (
        <ChatBubble
          key={post.id}
          isCurrentUser={userId === post.user.id}
          chatDate={formatChatBubbleDate(new Date(post.createdTime))}
          userPicture={avatarUrl(post.user)}
          onClick={() => {
            history.push(`/user/${post.user.id}`);
          }}
        >
          <>
            {post.media && (
              <img src={getMediaUrl(post.media.id)} className="chat-bubble-image" alt="" />
            )}
            {post.message !== '' && post.message}
          </>
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
