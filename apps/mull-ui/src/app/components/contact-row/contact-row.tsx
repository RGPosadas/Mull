import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './contact-row.scss';

/* eslint-disable-next-line */
export interface ContactRowProps {
  userId?: number;
  userPicture?: string;
  userName?: string;
  userDescription?: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export const ContactRow = ({
  userId,
  userPicture,
  userName,
  userDescription,
  onClick,
}: ContactRowProps) => {
  return (
    <div className="contact-container">
      <a href={`/profile/${userId}`}>
        <div className="user-information">
          <img className="user-profile-picture" src={userPicture} alt="user" />
          <div className="user-details">
            <span className="userName">{userName}</span>
            <span className="userDescription">{userDescription}</span>
          </div>
        </div>
      </a>
      <button className="friend-settings-icon" onClick={onClick}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
    </div>
  );
};

export default ContactRow;
