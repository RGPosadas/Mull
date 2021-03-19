import React from 'react';
import EventChat from '../event-chat/event-chat';

export const GroupChatPage = () => {
  return <EventChat channelName="Group Chat" restrictChatInput={false} />;
};

export default GroupChatPage;
