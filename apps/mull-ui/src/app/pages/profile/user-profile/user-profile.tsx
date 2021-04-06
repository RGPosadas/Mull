import {
  faCog,
  faLeaf,
  faPencilAlt,
  faUserFriends,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { History } from 'history';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import {
  RelationshipType,
  useGetRelationshipsQuery,
  User,
  useUserProfileQuery,
} from '../../../../generated/graphql';
import { formatJoinDate } from '../../../../utilities';
import ProfileHeader from '../../../components/profile-header/profile-header';
import SettingsButton from '../../../components/settings-button/settings-button';
import UserContext from '../../../context/user.context';
import './user-profile.scss';

export interface UserProfilePageProps {
  history: History;
}

export const UserProfilePage = ({ history }: UserProfilePageProps) => {
  const currentUserId = useContext(UserContext).userId;
  const { data: userProfile, loading } = useUserProfileQuery({ variables: { id: currentUserId } });
  const relData = useGetRelationshipsQuery();

  if (loading || relData.loading) return <div className="page-container">Loading...</div>;

  const { year, month, day } = formatJoinDate(new Date(userProfile.user.joinDate));

  let pendingCount = 0;
  relData.data?.getRelationships.forEach((relationship) => {
    if (relationship.type === RelationshipType.AddedMe) {
      pendingCount++;
    }
  });
  return (
    <div className="page-container">
      <ProfileHeader
        portfolioCount={userProfile.portfolioCount}
        friendCount={userProfile.friendCount}
        hostingCount={userProfile.hostingCount}
        isCurrentUser={true}
        user={userProfile.user as User}
      />
      <div className="settings-container">
        <h2>Portfolio</h2>
        <Link to={ROUTES.PROFILE.PORTFOLIO}>
          <SettingsButton icon={faLeaf} text="My Portfolio" />
        </Link>
      </div>
      <div className="settings-container">
        <h2>Friends</h2>
        <Link to={ROUTES.PROFILE.ADDFRIENDS} className="add-friends-link">
          <SettingsButton icon={faUserPlus} text="Add Friends" />
          {pendingCount ? <p className="friend-request-count">{pendingCount}</p> : null}
        </Link>
        <Link to="my-friends">
          <SettingsButton icon={faUserFriends} text="My Friends" />
        </Link>
      </div>
      <div className="settings-container">
        <h2>Misc.</h2>
        <Link to="/profile/edit">
          <SettingsButton icon={faPencilAlt} text="Edit Profile" />
        </Link>
        <SettingsButton
          icon={faCog}
          text="Settings"
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
