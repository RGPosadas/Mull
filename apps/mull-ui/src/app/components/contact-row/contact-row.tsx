import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FriendModal } from '..';
import { ROUTES } from '../../../constants';
import { User } from '../../../generated/graphql';
import { avatarUrl } from '../../../utilities';
import './contact-row.scss';

/* eslint-disable-next-line */
export interface ContactRowProps {
  user: User;
  lastMessage?: string;
  modalButton1Text?: string;
  modalButton1OnClick?: () => void;
  modalButton2Text?: string;
  modalButton2OnClick?: () => void;
  icon?: IconProp;
  id?: string;
}

export const ContactRow = ({
  user,
  lastMessage,
  modalButton1Text,
  modalButton1OnClick,
  modalButton2Text,
  modalButton2OnClick,
  icon = faEllipsisH,
  id = '',
}: ContactRowProps) => {
  // TODO: Replace boolean by the appropriate button option according to query
  const addedMe = false;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="contact-container" id={id}>
      <Link to={ROUTES.USER_BY_ID.replace(':id', user.id + '')}>
        <div className="user-information">
          <img className="user-profile-picture" src={avatarUrl(user)} alt="user" />
          <div className="user-details">
            <span className="username">{user.name}</span>
            {lastMessage && <span className="last-message">{lastMessage}</span>}
          </div>
        </div>
      </Link>
      <button
        className="contact-row-icon"
        data-testid="contact-row-button"
        onClick={() => setModalOpen(!modalOpen)}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
      <FriendModal
        user={user}
        open={modalOpen}
        setOpen={setModalOpen}
        paperClasses="my-friends-modal-container"
        maxWidth="xl"
        button1Text={modalButton1Text}
        button1OnClick={modalButton1OnClick}
        button2Text={modalButton2Text}
        button2OnClick={modalButton2OnClick}
      ></FriendModal>
    </div>
  );
};

export default ContactRow;
