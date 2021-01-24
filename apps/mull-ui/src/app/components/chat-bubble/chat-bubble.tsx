import React from 'react';
import './chat-bubble.scss';

export interface chatBubbleProps {
  isHost?: boolean;
  chatDate?: string;
  userPicture?: string;
  chatMessage?: string;
}

export const ChatBubble = ({ isHost, chatDate, userPicture, chatMessage }: chatBubbleProps) => {
  return (
    <div className="chat-container">
      <p className="announcement-time">{chatDate}</p>
      <div className={`${isHost ? 'host' : 'participant'}-chat-container`}>
        <img className="user-picture" src={userPicture} alt="user picture" />
        <p className="chat-bubble">{chatMessage}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
