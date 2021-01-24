import { faImages, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ChatBubble from '../../../components/chat-bubble/chat-bubble';
import './announcements.scss';

export const AnnouncementsPage = ({ history }) => {
  // TODO: Render chat messages from an array

  return (
    <div className="background-announcement">
      <ChatBubble
        isHost={false}
        chatDate="13:00 21/10/20"
        userPicture="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
        chatMessage="Hello, and welcome!"
      />
      <ChatBubble
        isHost={true}
        chatDate="13:00 21/10/20"
        userPicture="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
        chatMessage="Filler text is text that shares some characteristics of a real written text, but is random
        or otherwise generated. It may be used to display a sample of fonts, generate text for
        testing, or to spoof an e-mail spam filter."
      />
      <ChatBubble
        isHost={true}
        chatDate="13:00 21/10/20"
        userPicture="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
        chatMessage="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
        industries for previewing layouts and visual mockups."
      />
      <div className="announcement-box">
        <form className="form-announcement">
          <button className="add-picture-button">
            {<FontAwesomeIcon icon={faImages} className="add-picture-icon" />}
          </button>
          <input
            type="text"
            className="announcement-send"
            placeholder="Write your announcement here"
          ></input>
          <button className="send-button">
            {<FontAwesomeIcon icon={faPaperPlane} className="send-icon" />}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AnnouncementsPage;
