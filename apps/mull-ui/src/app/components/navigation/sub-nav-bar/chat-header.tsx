import React, { CSSProperties } from 'react';
import './chat-header.scss';

export interface ChatHeaderProps {
  style?: CSSProperties;
  className?: string;
  isDirectMessage?: boolean;
  userAvatarUrl?: string;
  userName?: string;
  eventTitle?: string;
}

export const ChatHeader = ({
  style,
  className,
  eventTitle,
  isDirectMessage,
  userAvatarUrl,
  userName,
}: ChatHeaderProps) => {
  return (
    <div className={`chat-header top-nav-bar-shadow ${className ? className : ''}`} style={style}>
      {isDirectMessage ? (
        <div className="direct-message-header-title">
          <img className="direct-message-header-image" src={userAvatarUrl} alt="user" />
          <h2 className="direct-message-header-name">{userName}</h2>
        </div>
      ) : (
        <h1 className="chat-header-title">{eventTitle}</h1>
      )}
    </div>
  );
};

export default ChatHeader;
