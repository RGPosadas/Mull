import { ISerializedPost } from '@mull/types';
import React, { useContext, useEffect, useRef } from 'react';
import { avatarUrl, formatChatBubbleDate, getMediaUrl } from '../../../utilities';
import ChatBubble from '../../components/chat-bubble/chat-bubble';
import UserContext from '../../context/user.context';
import './chat-bubble-list.scss';

export interface ChatBubbleListProps {
  posts: Partial<ISerializedPost>[];
  subToMore: () => void;
}

export const ChatBubbleList = ({ posts, subToMore }: ChatBubbleListProps) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView(); // Scroll to bottom of chat on initial page load
    subToMore();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    setTimeout(() => messageEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100); // wait a little and Scroll to bottom chat smoothly when new post added
  }, [posts]);

  const chatBubbleList = posts.map((post) => {
    return (
      <ChatBubble
        key={post.id}
        isCurrentUser={userId === post.user.id}
        chatDate={formatChatBubbleDate(new Date(post.createdTime))}
        userPicture={avatarUrl(post.user)}
      >
        <>
          {post.medias && <img src={getMediaUrl(post.medias.id)} className="img" alt="" />}
          {post.medias && <br />}
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
