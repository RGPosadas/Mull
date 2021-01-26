import { ROUTES } from 'apps/mull-ui/src/constants';
import React from 'react';
import { ChatInput, SubNavBar, SubNavBarHeader } from '../../components';

export interface MessagePageProps {
  children: React.ReactNode;
}

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
