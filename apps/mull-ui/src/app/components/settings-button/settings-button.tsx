import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './settings-button.scss';

export interface setttingsButtonProps {
  icon?: IconProp;
  settingName: string;
}

export const SettingsButton = ({ icon, settingName }: setttingsButtonProps) => {
  return (
    <div>
      <button className="settings-button-container">
        <FontAwesomeIcon className="settings-icon" icon={icon} />
        {settingName}
      </button>
    </div>
  );
};

export default SettingsButton;
