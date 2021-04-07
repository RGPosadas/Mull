import React, { CSSProperties } from 'react';
import { getMediaUrl } from '../../../../utilities';
import './chat-header.scss';

export interface ChatHeaderProps {
  style?: CSSProperties;
  className?: string;
  isDirectMessage?: boolean;
  userPictureId?: number;
  userName?: string;
  eventTitle?: string;
}

export const ChatHeader = ({
  style,
  className,
  eventTitle,
  isDirectMessage,
  userPictureId,
  userName,
}: ChatHeaderProps) => {
  return (
    <div className={`chat-header top-nav-bar-shadow ${className ? className : ''}`} style={style}>
      {isDirectMessage ? (
        <div className="direct-message-header-title">
          <img
            className="direct-message-header-image"
            src={getMediaUrl(userPictureId)}
            alt="user"
          />
          <h2 className="direct-message-header-name">{userName}</h2>
        </div>
      ) : (
        <h1 className="chat-header-title">{eventTitle}</h1>
      )}
    </div>
  );
};

export default ChatHeader;
