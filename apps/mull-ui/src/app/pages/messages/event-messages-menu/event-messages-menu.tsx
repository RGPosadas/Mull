import React from 'react';
import { useParams } from 'react-router';
import { ChatHeader, SubNavBar } from '../../../components';

export interface EventMessagesMenuProps {
  children: React.ReactNode;
}

/**
 * Adds a sub-nav-header and sub-navigation to the top of the page, above the children
 * Children are rendered in between and then adds a sticky chat-input at the bottom of the page.
 */
export const EventMessagesMenu = ({ children }: EventMessagesMenuProps) => {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id);
  const groupChatRoute = {
    url: `/event/messages/${eventId}/group-chat`,
    displayName: 'Group Chat',
  };
  const announcementRoute = {
    url: `/event/messages/${eventId}/announcements`,
    displayName: 'Announcements',
  };

  return (
    <div>
      <ChatHeader eventTitle="Clean up Rogers Park" />
      <SubNavBar
        routes={[groupChatRoute, announcementRoute]}
        className="with-header top-nav-bar-shadow"
      />
      {children}
    </div>
  );
};

export default EventMessagesMenu;
