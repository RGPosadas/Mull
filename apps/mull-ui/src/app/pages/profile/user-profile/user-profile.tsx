import {
  faCog,
  faLeaf,
  faPencilAlt,
  faUserFriends,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from 'apps/mull-ui/src/constants';
import { History } from 'history';
import React from 'react';
import { Link } from 'react-router-dom';
import { User, useUserProfileQuery } from '../../../../generated/graphql';
import { avatarUrl, formatJoinDate } from '../../../../utilities';
import ProfileHeader from '../../../components/profile-header/profile-header';
import SettingsButton from '../../../components/settings-button/settings-button';
import './user-profile.scss';

export interface UserProfilePageProps {
  history: History;
}

export const UserProfilePage = ({ history }: UserProfilePageProps) => {
  const { data: userProfile, loading } = useUserProfileQuery();

  if (loading) return <div className="page-container">Loading...</div>;

  const { year, month, day } = formatJoinDate(new Date(userProfile.user.joinDate));
  const friendRequestExists = true;

  return (
    <div className="page-container">
      <ProfileHeader
        userName={userProfile.user.name}
        userPicture={avatarUrl(userProfile.user as User)}
        userDescription={userProfile.user.description}
        portfolioCount={userProfile.portfolioCount}
        friendCount={userProfile.friendCount}
        hostingCount={userProfile.hostingCount}
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
        <SettingsButton
          icon={faCog}
          settingName="Settings"
          onClick={() => {
            history.push(ROUTES.SETTINGS);
          }}
        />
      </div>
      <div className="joined-date-container">
        <p>
          Joined Müll on {month} {day}, {year}
        </p>
      </div>
    </div>
  );
};

export default UserProfilePage;
