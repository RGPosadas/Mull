import { History } from 'history';
import React, { useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants';
import UserContext from '../context/user.context';
import OtherUserProfilePage from '../pages/profile/other-user-profile/other-user-profile';

export interface ProfilesRouteProps {
  history: History;
}

export const ProfilesRoute = ({ history }: ProfilesRouteProps) => {
  const currentUserId = useContext(UserContext).userId;
  const { id } = useParams<{ id: string }>();
  const otherUserId = parseInt(id);

  return currentUserId === otherUserId ? (
    <Redirect to={ROUTES.PROFILE.DISPLAY} />
  ) : (
    <OtherUserProfilePage history={history} otherUserId={otherUserId} />
  );
};

export default ProfilesRoute;
