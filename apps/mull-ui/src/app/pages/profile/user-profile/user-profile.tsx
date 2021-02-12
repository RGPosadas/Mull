import {
  faCog,
  faLeaf,
  faPencilAlt,
  faUserFriends,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileHeader from '../../../components/profile-header/profile-header';
import SettingsButton from '../../../components/settings-button/settings-button';
import './user-profile.scss';

export interface userProfileProps {
  joinDate?: string;
  friendRequestCount?: number;
}

export const UserProfilePage = ({ joinDate, friendRequestCount }: userProfileProps) => {
  return (
    <div>
      <ProfileHeader
        userName="Andrea Gloria"
        userPicture="https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg"
        userPortfolio={8}
        userFriends={24}
        userHosting={2}
        userDescription="Regardless of making complicated reasons or calculations, I just want to live simply counting up to about 5 or 6."
      ></ProfileHeader>
      <div className="settings-container">
        <h3>Portfolio</h3>
        <SettingsButton icon={faLeaf} settingName="My Portfolio"></SettingsButton>
      </div>
      <div className="settings-container with-friends">
        <h3>Friends</h3>
        <SettingsButton icon={faUserPlus} settingName="Add Friends"></SettingsButton>
        <SettingsButton icon={faUserFriends} settingName="My Friends"></SettingsButton>
        <p className="friend-request-count">{(friendRequestCount = 4)}</p>
      </div>
      <div className="settings-container below-friends">
        <h3>Misc.</h3>
        <Link to="/profile/edit">
          <SettingsButton icon={faPencilAlt} settingName="Edit Profile"></SettingsButton>
        </Link>
        <SettingsButton icon={faCog} settingName="Settings"></SettingsButton>
      </div>
      <div className="joined-date-container">
        <p>Joined Müll on {(joinDate = 'February 2, 2021')}</p>
      </div>
    </div>
  );
};
export default UserProfilePage;
