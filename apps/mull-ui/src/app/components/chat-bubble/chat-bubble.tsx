import React from 'react';
import './chat-bubble.scss';

export interface chatBubbleProps {
  isCurrentUser?: boolean;
  chatDate: string;
  userPicture: string;
  chatMessage: string;
}

export const ChatBubble = ({
  isCurrentUser,
  chatDate,
  userPicture,
  chatMessage,
}: chatBubbleProps) => {
  return (
    <div className="chat-container">
      <p className="announcement-time">{chatDate}</p>
      <div className={`${isCurrentUser ? 'current-user' : 'participant'}-chat-container`}>
        <img className="user-picture" src={userPicture} alt="user" />
        <p className="chat-bubble">{chatMessage}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
