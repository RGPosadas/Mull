import { History } from 'history';
import React, { CSSProperties } from 'react';
import { User } from '../../../../generated/graphql';
import { avatarUrl } from '../../../../utilities';
import withSpinnerHOC from '../../with-spinner/with-spinner';
import './chat-header.scss';

export interface ChatHeaderProps {
  style?: CSSProperties;
  className?: string;
  isDirectMessage?: boolean;
  isLoading?: boolean;
  user?: Partial<User>;
  eventTitle?: string;
  history?: History;
}

export const ChatHeader = ({
  style,
  className,
  eventTitle,
  isDirectMessage,
  user,
  history,
}: ChatHeaderProps) => {
  return (
    <div className={`chat-header top-nav-bar-shadow ${className ? className : ''}`} style={style}>
      {isDirectMessage ? (
        <div
          className="direct-message-header"
          onClick={() => {
            history.push(`/user/${user.id}`);
          }}
          data-testid="direct-message-header"
        >
          <img className="direct-message-header-image" src={avatarUrl(user)} alt="user" />
          <h2 className="direct-message-header-name">{user.name}</h2>
        </div>
      ) : (
        <h1 className="chat-header-title">{eventTitle}</h1>
      )}
    </div>
  );
};

export default withSpinnerHOC(ChatHeader);
