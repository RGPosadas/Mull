import {
  faCog,
  faLeaf,
  faPencilAlt,
  faUserFriends,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { User, useUserProfileQuery } from '../../../../generated/graphql';
import { avatarUrl, formatJoinDate } from '../../../../utilities';
import ProfileHeader from '../../../components/profile-header/profile-header';
import SettingsButton from '../../../components/settings-button/settings-button';
import './user-profile.scss';

export const UserProfilePage = () => {
  const { data: userProfile, loading } = useUserProfileQuery();

  if (!loading && userProfile) {
    var { year, month, day } = formatJoinDate(new Date(userProfile.user.joinDate));
    const friendRequestExists = true;

    return (
      <div className="page-container">
        <ProfileHeader
          userName={userProfile.user.name}
          userPicture={avatarUrl(userProfile.user as User)}
          userDescription={userProfile.user.description}
          userPortfolio={userProfile.portfolioCount}
          userFriends={userProfile.friendCount}
          userHosting={userProfile.hostingCount}
        />
        <div className="settings-container">
          <h3>Portfolio</h3>
          <SettingsButton icon={faLeaf} settingName="My Portfolio" />
        </div>
        <div className="settings-container with-friends">
          <h3>Friends</h3>
          <SettingsButton icon={faUserPlus} settingName="Add Friends" />
          <SettingsButton icon={faUserFriends} settingName="My Friends" />
          <p className={friendRequestExists ? 'friend-request-count' : 'no-friend-request'}>{4}</p>
        </div>
        <div className="settings-container below-friends">
          <h3>Misc.</h3>
          <Link to="/profile/edit">
            <SettingsButton icon={faPencilAlt} settingName="Edit Profile" />
          </Link>
          <SettingsButton icon={faCog} settingName="Settings" />
        </div>
        <div className="joined-date-container">
          <p>
            Joined Müll on {month} {day}, {year}
          </p>
        </div>
      </div>
    );
  } else {
    return <div className="page-container">Loading...</div>;
  }
};

export default UserProfilePage;
