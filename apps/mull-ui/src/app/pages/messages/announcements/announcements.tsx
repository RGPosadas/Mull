import React from 'react';
import { ChatInput } from '../../../components';
import ChatBubble from '../../../components/chat-bubble/chat-bubble';

export const AnnouncementsPage = () => {
  // TODO: Render chat messages from an array

  return (
    <div>
      <ChatBubble
        isCurrentUser={false}
        chatDate="13:00 21/10/20"
        userPicture="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
      >
        Hello, and welcome!
      </ChatBubble>
      <ChatBubble
        isCurrentUser={true}
        chatDate="13:00 21/10/20"
        userPicture="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
      >
        Filler text is text that shares some characteristics of a real written text, but is random
        or otherwise generated. It may be used to display a sample of fonts, generate text for
        testing, or to spoof an e-mail spam filter.
      </ChatBubble>

      <ChatBubble
        isCurrentUser={true}
        chatDate="13:00 21/10/20"
        userPicture="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
      >
        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
        industries for previewing layouts and visual mockups.
      </ChatBubble>
      <ChatBubble
        isCurrentUser={true}
        chatDate="13:00 21/10/20"
        userPicture="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
      >
        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
        industries for previewing layouts and visual mockups.
      </ChatBubble>
      <ChatBubble
        isCurrentUser={true}
        chatDate="13:00 21/10/20"
        userPicture="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
      >
        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
        industries for previewing layouts and visual mockups.
      </ChatBubble>
      <ChatBubble
        isCurrentUser={true}
        chatDate="13:00 21/10/20"
        userPicture="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
      >
        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
        industries for previewing layouts and visual mockups.
      </ChatBubble>
      <ChatBubble
        isCurrentUser={true}
        chatDate="13:00 21/10/20"
        userPicture="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
      >
        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
        industries for previewing layouts and visual mockups.
      </ChatBubble>
      <ChatInput />
    </div>
  );
};
export default AnnouncementsPage;
