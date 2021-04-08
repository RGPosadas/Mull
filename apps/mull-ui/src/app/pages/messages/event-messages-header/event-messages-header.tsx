import React from 'react';
import { useParams } from 'react-router';
import { ROUTES } from '../../../../constants';
import { useEventTitleQuery } from '../../../../generated/graphql';
import { ChatHeader, Spinner, SubNavBar } from '../../../components';

export interface EventMessagesMenuProps {
  children: React.ReactNode;
}

/**
 * Adds a sub-nav-header and sub-navigation to the top of the page, above the children
 * Children are rendered in between and then adds a sticky chat-input at the bottom of the page.
 */
export const EventMessagesHeader = ({ children }: EventMessagesMenuProps) => {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id);
  const { data, loading } = useEventTitleQuery({ variables: { eventId } });
  const groupChatRoute = ROUTES.GROUPCHAT;
  groupChatRoute.url = `/messages/event/${eventId}/group-chat`;
  const announcementRoute = ROUTES.ANNOUNCEMENTS;
  announcementRoute.url = `/messages/event/${eventId}/announcements`;

  if (loading) return <Spinner />;

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

export default EventMessagesHeader;
