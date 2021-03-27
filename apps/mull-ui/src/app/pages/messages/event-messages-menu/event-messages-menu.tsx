import React from 'react';
import { useParams } from 'react-router';
import { ROUTES } from '../../../../constants';
import { useEventTitleQuery } from '../../../../generated/graphql';
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
  const { data, loading } = useEventTitleQuery({ variables: { eventId } });
  const groupChatRoute = ROUTES.GROUPCHAT;
  groupChatRoute.url = groupChatRoute.url.replace(':id', id);
  const announcementRoute = ROUTES.ANNOUNCEMENTS;
  announcementRoute.url = announcementRoute.url.replace(':id', id);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <ChatHeader eventTitle={data.event.title} />
      <SubNavBar
        routes={[groupChatRoute, announcementRoute]}
        className="with-header top-nav-bar-shadow"
      />
      {children}
    </div>
  );
};

export default EventMessagesMenu;
