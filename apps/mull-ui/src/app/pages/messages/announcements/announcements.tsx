import React from 'react';
import ChatBubbleList from '../../../components/chat-bubble-list/chat-bubble-list';

export const AnnouncementsPage = () => {
  // TODO: Replace the following with the real announcement page implementation

  return (
    <>
      <ChatBubbleList
        data={{
          posts: [
            {
              user: {
                id: 1,
                avatar: null,
              },
              message: 'message 1 from user 1, current user id is 1',
              createdTime: new Date(),
            },
            {
              user: {
                id: 2,
                avatar: null,
              },
              message: 'message 2 from user 2',
              createdTime: new Date(),
            },
            {
              user: {
                id: 3,
                avatar: { id: 1 },
              },
              message: 'message 3 from user 3',
              createdTime: new Date(),
            },
          ],
          currentUser: {
            id: 1,
          },
        }}
      />
    </>
  );
};
export default AnnouncementsPage;
