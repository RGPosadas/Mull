import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './contact-row.scss';

/* eslint-disable-next-line */
export interface ContactRowProps {
  userId?: number;
  userPicture?: string;
  userName?: string;
  lastMessage?: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export const ContactRow = ({
  userId,
  userPicture,
  userName,
  lastMessage,
  onClick,
}: ContactRowProps) => {
  return (
    <div className="contact-container">
      <Link to={`/profile/${userId}`}>
        <div className="user-information">
          <img className="user-profile-picture" src={userPicture} alt="user" />
          <div className="user-details">
            <span className="username">{userName}</span>
            <span className="last-message">{lastMessage}</span>
          </div>
        </div>
      </Link>
      <button className="friend-settings-icon" onClick={onClick}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
    </div>
  );
};

export default ContactRow;
