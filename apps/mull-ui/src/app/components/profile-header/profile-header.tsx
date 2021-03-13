import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { MullButton } from '..';
import './profile-header.scss';

export function checkFriendStatus(isFriend: boolean) {
  let friendStatus: string;
  if (isFriend === true) {
    friendStatus = 'Friends';
  } else if (isFriend === false) {
    friendStatus = 'Pending';
  }
  // No relation in the Friends table
  else {
    friendStatus = 'Add Friend';
  }
  return (
    <div className="friend-status-container">
      <MullButton
        className={isFriend ? 'friend-status-button' : 'not-friend-status-button'}
        // data-testid={friendStatus}
      >
        {friendStatus}
      </MullButton>
    </div>
  );
}

export interface profileHeaderProps {
  userName?: string;
  userPicture?: string;
  portfolioCount?: number;
  friendCount?: number;
  hostingCount?: number;
  userDescription?: string;
}

export const ProfileHeader = ({
  userName = '',
  userPicture = '',
  portfolioCount = 0,
  friendCount = 0,
  hostingCount = 0,
  userDescription = '',
}: profileHeaderProps) => {
  // TODO: Check UserID, if currentUserID == profileUserID, then it is true, so return without the Friend button, otherwise return with the Friend button
  const isCurrentUser = true;
  const isFriend = true;

  return (
    <div className="profile-header-container">
      <div className="user-name-container">
        <h1 data-testid="userName">{userName}</h1>
        <button className="share-button">
          <FontAwesomeIcon icon={faShareAlt} />
        </button>
      </div>
      <div className="profile-header">
        <img className="user-profile-picture" src={userPicture} alt="user" />
        <div
          className={
            isCurrentUser ? 'profile-side-container for-current-user' : 'profile-side-container'
          }
        >
          <button className="profile-stats" data-testid="portfolioCount">
            {portfolioCount}
            <br />
            Portfolio
          </button>
          <button className="profile-stats" data-testid="friendCount">
            {friendCount}
            <br />
            Friends
          </button>
          <button className="profile-stats" data-testid="hostingCount">
            {hostingCount}
            <br />
            Hosting
          </button>
          {isCurrentUser ? null : checkFriendStatus(isFriend)}
        </div>
      </div>
      <div className="user-description-container">
        <p className="user-description" data-testid="userDescription">
          {userDescription}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
