import React, { ReactChild } from 'react';
import './chat-bubble.scss';

export interface chatBubbleProps {
  isCurrentUser?: boolean;
  chatDate?: string;
  userPicture?: string;
  children?: ReactChild;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

export const ChatBubble = ({
  isCurrentUser = false,
  chatDate = '',
  userPicture = '',
  children = '',
  onClick = null,
}: chatBubbleProps) => {
  return (
    <div className="chat-container">
      <p className="announcement-time">{chatDate}</p>
      <div className={`${isCurrentUser ? 'current-user' : 'other-user'}-chat-container`}>
        <img className="user-picture" src={userPicture} alt="user" onClick={onClick} />
        <p className="chat-bubble">{children}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
