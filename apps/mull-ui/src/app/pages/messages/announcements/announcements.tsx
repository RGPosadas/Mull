import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './announcements.scss';

export const AnnouncementsPage = ({ history }) => {
  return (
    <div className="background-announcement">
      <div className="announcement-container">
        <p className="announcement-time">13:00 21/10/20</p>
        <img
          className="host-picture"
          src="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
          alt="participant_1"
        />
        <p className="announcement-posted">
          Filler text is text that shares some characteristics of a real written text, but is random
          or otherwise generated. It may be used to display a sample of fonts, generate text for
          testing, or to spoof an e-mail spam filter.
        </p>
      </div>
      <div className="announcement-container">
        <p className="announcement-time">13:00 23/10/20</p>
        <img
          className="participant-picture"
          src="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
          alt="participant_1"
        />
        <p className="announcement-read">
          Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
          industries for previewing layouts and visual mockups.
        </p>
      </div>
      <div className="announcement-container">
        <p className="announcement-time">13:00 21/10/20</p>
        <img
          className="host-picture"
          src="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
          alt="participant_1"
        />
        <p className="announcement-posted">
          Filler text is text that shares some characteristics of a real written text, but is random
          or otherwise generated. It may be used to display a sample of fonts, generate text for
          testing, or to spoof an e-mail spam filter.
        </p>
      </div>
      <div className="announcement-container">
        <p className="announcement-time">13:00 21/10/20</p>
        <img
          className="host-picture"
          src="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
          alt="participant_1"
        />
        <p className="announcement-posted">
          Filler text is text that shares some characteristics of a real written text, but is random
          or otherwise generated. It may be used to display a sample of fonts, generate text for
          testing, or to spoof an e-mail spam filter.
        </p>
      </div>
      <div className="announcement-container">
        <p className="announcement-time">13:00 21/10/20</p>
        <img
          className="host-picture"
          src="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
          alt="participant_1"
        />
        <p className="announcement-posted">
          Filler text is text that shares some characteristics of a real written text, but is random
          or otherwise generated. It may be used to display a sample of fonts, generate text for
          testing, or to spoof an e-mail spam filter.
        </p>
      </div>
      <div className="announcement-container">
        <p className="announcement-time">13:00 21/10/20</p>
        <img
          className="host-picture"
          src="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
          alt="participant_1"
        />
        <p className="announcement-posted">Hello, and welcome!</p>
      </div>
      <div className="announcement-box">
        <form className="form-announcement">
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
