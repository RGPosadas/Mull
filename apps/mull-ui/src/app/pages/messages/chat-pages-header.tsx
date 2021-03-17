import React from 'react';
import { ROUTES } from '../../../constants';
import { SubNavBar } from '../../components';

export interface MessagePageProps {
  children: React.ReactNode;
}

/**
 * Adds a sub-nav-header and sub-navigation to the top of the page, above the children
 * Children are rendered in between and then adds a sticky chat-input at the bottom of the page.
 */
export const ChatPagesHeaders = ({ children }: MessagePageProps) => {
  return (
    <div>
      <SubNavBar
        routes={[ROUTES.DIRECT_MESSAGES, ROUTES.EVENT_MESSAGE_LIST]}
        className="with-header top-nav-bar-shadow"
      />
      {children}
    </div>
  );
};

export default ChatPagesHeaders;
