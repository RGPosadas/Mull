import { User } from 'apps/mull-ui/src/generated/graphql';
import { avatarUrl } from 'apps/mull-ui/src/utilities';
import React, { ReactChild } from 'react';
import './chat-bubble.scss';

export interface chatBubbleProps {
  isCurrentUser?: boolean;
  chatDate?: string;
  user: Partial<User>;
  children?: ReactChild;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

export const ChatBubble = ({
  isCurrentUser = false,
  chatDate = '',
  user,
  children = '',
  onClick = null,
}: chatBubbleProps) => {
  return (
    <div className="chat-bubble-container">
      <div className="chat-bubble-header">
        <p>{chatDate}</p>
        <p className="chat-bubble-header-username">{user.name}</p>
      </div>
      <div className={`${isCurrentUser ? 'current-user' : 'other-user'}-chat-container`}>
        <img className="user-picture" src={avatarUrl(user)} alt="user" onClick={onClick} />
        <p className="chat-bubble">{children}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
