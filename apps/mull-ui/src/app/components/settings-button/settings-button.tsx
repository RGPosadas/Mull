import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './settings-button.scss';

export interface setttingsButtonProps {
  icon?: IconProp;
  settingName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const SettingsButton = ({ icon, settingName, onClick }: setttingsButtonProps) => {
  return (
    <div>
      <button className="settings-button-container" onClick={onClick}>
        <FontAwesomeIcon className="settings-icon" icon={icon} />
        {settingName}
      </button>
    </div>
  );
};

export default SettingsButton;
