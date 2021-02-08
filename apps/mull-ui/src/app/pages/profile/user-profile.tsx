import React from 'react';
import ProfileHeader from '../../components/profile-header/profile-header';
import SettingsButton from '../../components/settings-button/settings-button';

export const UserProfilePage = () => {
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
      <SettingsButton></SettingsButton>
    </div>
  );
};
export default UserProfilePage;
