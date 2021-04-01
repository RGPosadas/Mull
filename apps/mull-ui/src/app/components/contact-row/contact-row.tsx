import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../generated/graphql';
import { avatarUrl } from '../../../utilities';
import FriendModal from '../modal/friend-modal/friend-modal';
import './contact-row.scss';

/* eslint-disable-next-line */
export interface ContactRowProps {
  userId?: number;
  userPicture?: string;
  lastMessage?: string;
  userName?: string;
  icon: IconProp;
}

export const ContactRow = ({
  userId,
  userPicture,
  userName,
  lastMessage,
  icon,
}: ContactRowProps) => {
  const user: Partial<User> = {
    name: `${userName}`,
  };
  const [open, setOpen] = useState(false);

  // TODO: Replace boolean by the appropriate button option according to query
  const addedMe = false;

  return (
    <div className="contact-container">
      <Link to={`/profile/${userId}`}>
        <div className="user-information">
          <img className="user-profile-picture" src={avatarUrl(user)} alt="user" />
          <div className="user-details">
            <span className="username">{userName}</span>
            {lastMessage && <span className="last-message">{lastMessage}</span>}
          </div>
        </div>
      </Link>
      <button className="friend-settings-icon" onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={icon} />
      </button>
      <FriendModal
        open={open}
        setOpen={setOpen}
        user={user}
        // TODO: Button should redirect to appropriate page
        button1Text="View Profile"
        button1OnClick={() => {
          console.log('clicked 1');
        }}
        button2Text={addedMe ? 'Add Friend' : 'Cancel Request'}
        button2OnClick={() => {
          console.log('clicked 2');
        }}
      />
    </div>
  );
};

export default ContactRow;
