import React, { CSSProperties } from 'react';
import './chat-header.scss';

export interface ChatHeaderProps {
  style?: CSSProperties;
  className?: string;
  eventTitle: string;
}

export const ChatHeader = ({ style, className, eventTitle }: ChatHeaderProps) => {
  return (
    <div className={`header ${className ? className : ''}`} style={style}>
      <h1>{eventTitle}</h1>
    </div>
  );
};

export default ChatHeader;
