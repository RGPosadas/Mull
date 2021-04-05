import { History } from 'history';
import React from 'react';
import EventChat from '../event-chat/event-chat';

export interface AnnouncementsPageProps {
  history: History;
}

export const AnnouncementsPage = ({ history }: AnnouncementsPageProps) => (
  <EventChat channelName="Announcements" restrictChatInput history={history} />
);
export default AnnouncementsPage;
