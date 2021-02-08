import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './profile-header.scss';

export interface profileHeaderProps {
  userName?: string;
  userPicture?: string;
  userPortfolio?: number;
  userFriends?: number;
  userHosting?: number;
  userDescription?: string;
}

export const ProfileHeader = ({
  userName = '',
  userPicture = '',
  userPortfolio = 0,
  userFriends = 0,
  userHosting = 0,
  userDescription = '',
}: profileHeaderProps) => {
  return (
    <div className="profile-background">
      <div className="user-name-container">
        <h1>{userName}</h1>
        <button>
          <FontAwesomeIcon className="share-button" icon={faShareAlt} />
        </button>
      </div>
      <div className="profile-header">
        <img className="profile-picture" src={userPicture} alt="user" />
        <button className="profile-stats">
          {userPortfolio}
          <br />
          Portfolio
        </button>
        <button className="profile-stats">
          {userFriends}
          <br />
          Friends
        </button>
        <button className="profile-stats">
          {userHosting}
          <br />
          Hosting
        </button>
      </div>
      <div className="user-description-container">
        <p>{userDescription}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
