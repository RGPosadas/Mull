import React from 'react';
import './settings-button.scss';

export interface setttingsButtonProps {
  isCurrentUser?: boolean;
  chatDate?: string;
  userPicture?: string;
}

export const SettingsButton = ({}: setttingsButtonProps) => {
  return (
    <div className="button-background">
      <p>This is the settings button</p>
    </div>
  );
};

export default SettingsButton;
