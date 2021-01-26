import { ROUTES } from 'apps/mull-ui/src/constants';
import React from 'react';
import { ChatInput, SubNavBar, SubNavBarHeader } from '../../components';

export interface MessagePageProps {
  children: React.ReactNode;
}
/**
 * Adds a sub-nav-header and sub-navigation to the top of the page, above the children
 * Children are rendered in between and then adds a sticky chat-input at the bottom of the page.
 */
export const MessagesPage = ({ children }: MessagePageProps) => {
  return (
    <div>
      <SubNavBarHeader eventTitle="Clean up Rogers Park" />
      <SubNavBar
        routes={[ROUTES.GROUPCHAT, ROUTES.ANNOUNCEMENTS]}
        className="with-header top-nav-bar-shadow"
      />
      {children}
      <ChatInput />
    </div>
  );
};

export default MessagesPage;
