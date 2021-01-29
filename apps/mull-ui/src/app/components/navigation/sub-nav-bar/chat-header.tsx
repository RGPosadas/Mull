import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties } from 'react';
import './chat-header.scss';

export interface ChatHeaderProps {
  style?: CSSProperties;
  className?: string;
  eventTitle: string;
}

export const ChatHeader = ({ style, className, eventTitle }: ChatHeaderProps) => {
  return (
    <div className={`header ${className}`} style={style}>
      <button className="hamburger-button">
        {<FontAwesomeIcon icon={faBars} size="2x" color="grey" className="hamburger-menu" />}
      </button>
      <h1>{eventTitle}</h1>
    </div>
  );
};

export default ChatHeader;
