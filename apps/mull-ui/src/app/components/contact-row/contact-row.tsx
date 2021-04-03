import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { History } from 'history';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MullButton, MullModal } from '..';
import { User } from '../../../generated/graphql';
import { avatarUrl } from '../../../utilities';
import './contact-row.scss';

/* eslint-disable-next-line */
export interface ContactRowProps {
  userId?: number;
  userPicture?: string;
  lastMessage?: string;
  userName?: string;
  icon: IconProp;
  history: History;
  modalButton1Text: string;
  modalButton1OnClick: any;
  modalButton2Text: string;
  modalButton2OnClick: any;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export const ContactRow = ({
  userId,
  userPicture,
  userName,
  lastMessage,
  icon,
  history,
  modalButton1Text,
  modalButton1OnClick,
  modalButton2Text,
  modalButton2OnClick,
}: ContactRowProps) => {
  const user: Partial<User> = {
    name: `${userName}`,
  };

  // TODO: Replace boolean by the appropriate button option according to query
  const addedMe = false;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
      <button
        className="friend-settings-icon"
        data-testid="contact-row-button"
        onClick={() => setModalOpen(!modalOpen)}
      >
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
      <MullModal
        open={modalOpen}
        setOpen={setModalOpen}
        paperClasses="my-friends-modal-container"
        maxWidth="sm"
      >
        <img
          className="user-profile-picture"
          data-testid="event-page-image"
          src={userPicture}
          alt="Event Page"
        />
        <p>{userName}</p>
        <MullButton
          className="event-page-button contact-row-button"
          type={'button'}
          altStyle
          onClick={modalButton1OnClick}
        >
          {modalButton1Text}
        </MullButton>
        <MullButton
          onClick={async () => {
            await modalButton2OnClick();
            setModalOpen(false);
            location.reload();
          }}
          className="event-page-button contact-row-button"
          type={'button'}
          altStyle
        >
          {modalButton2Text}
        </MullButton>
      </MullModal>
    </div>
  );
};

export default ContactRow;
