import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { MullButton } from '..';
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
  // TODO: Check UserID, if currentUserID == profileUserID, then it is true, so return without the Friend button, otherwise return with the Friend button
  const isCurrentUser = true;
  const isFriend = true;

  function checkFriendStatus(isFriend: boolean) {
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
        <MullButton className={isFriend ? 'friend-status-button' : 'not-friend-status-button'}>
          {friendStatus}
        </MullButton>
      </div>
    );
  }

  return (
    <div className="profile-header-container">
      <div className="user-name-container">
        <h1>{userName}</h1>
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
          {isCurrentUser ? null : checkFriendStatus(isFriend)}
        </div>
      </div>
      <div className="user-description-container">
        <p>{userDescription}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
