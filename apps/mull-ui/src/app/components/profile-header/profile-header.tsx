import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { MullButton } from '..';
import './profile-header.scss';

// TODO: Check UserID, if currentUserID == profileUserID, then it is true, so return without the Friend button, otherwise return with the Friend button
let isCurrentUser = false;
let isFriend = false;

function checkFriendStatus() {
  return (
    <div className="friend-status-container">
      <MullButton className={isFriend ? 'friend-status-button' : 'not-friends-status-button'}>
        {(() => {
          switch (isFriend) {
            case true:
              return 'Friends';
            case false:
              return 'Pending';
            // No relation at all in the Friends table
            case null:
              return 'Add Friend';
          }
        })()}
      </MullButton>
    </div>
  );
}

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
        <img className="user-profile-picture" src={userPicture} alt="user" />
        <div
          className={
            isCurrentUser ? 'profile-side-container for-current-user' : 'profile-side-container'
          }
        >
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
          {isCurrentUser ? null : checkFriendStatus()}
        </div>
      </div>
      <div className="user-description-container">
        <p>{userDescription}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
