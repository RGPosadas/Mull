import { History } from 'history';
import React from 'react';
import EventChat from '../event-chat/event-chat';

export interface GroupChatProps {
  history: History;
}

export const GroupChatPage = ({ history }: GroupChatProps) => {
  return <EventChat channelName="Group Chat" restrictChatInput={false} history={history} />;
};

export default GroupChatPage;
