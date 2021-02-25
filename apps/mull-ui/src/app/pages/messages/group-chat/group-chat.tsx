import React from 'react';
import EventChat from '../event-chat/event-chat';

export const GroupChatPage = () => {
  return <EventChat eventId={1} channelName="Group Chat" restrictChatInput={false} />;
};

export default GroupChatPage;
