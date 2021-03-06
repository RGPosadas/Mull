import React from 'react';
import EventChat from '../event-chat/event-chat';

export const AnnouncementsPage = () => (
  <EventChat eventId={1} channelName="Announcements" restrictChatInput />
);
export default AnnouncementsPage;
